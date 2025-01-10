const calculateWaterCharges = async ({
  category_id,
  connection_size_id,
  consumption,
  connection_type_id,
}) => {
  try {
    const isBulk = !(
      connection_size_id == 1 ||
      connection_size_id == 2 ||
      connection_size_id == 3
    );

    const tariffs = await db.tariffConfiguration.findAll({
      where: { category_id, charge_type_id: 1 }, // charge_type_id = 1 for waterCharges
      include: [
        {
          model: db.slabs,
          as: "slab",
          attributes: ["min_consumption", "max_consumption"],
        },
      ],
      order: [[{ model: db.slabs, as: "slab" }, "min_consumption", "ASC"]],
    });

    if (!tariffs || tariffs.length === 0) {
      throw new Error(
        "No water tariff configurations found for the given category and connection size."
      );
    }

    let totalWaterCharge = 0;
    let remainingConsumption = consumption;

    for (const tariff of tariffs) {
      const { ratePerThousand, slab } = tariff;
      const { min_consumption, max_consumption } = slab;

      const slabMin = min_consumption || 0;
      const slabMax = max_consumption || remainingConsumption;

      const applicableConsumption = Math.min(
        remainingConsumption,
        slabMax - slabMin
      );

      if (applicableConsumption > 0) {
        totalWaterCharge += (applicableConsumption / 1000) * ratePerThousand;
        remainingConsumption -= applicableConsumption;
      }

      if (remainingConsumption <= 0) break;
    }

    // Fetch dynamic multiplier for non-domestic connections (category_id = 2)
    let multiplier = 1;
    if (connection_type_id === 2) {
      const multiplierData = await db.tariffConfiguration.findOne({
        where: {
          category_id,
          connection_size_id,
          charge_type_id: 5, // Assuming you store multiplier info in charge_type_id 5
        },
      });

      if (multiplierData) {
        multiplier = multiplierData.multiplier || 1; // Use the multiplier fetched, default to 1 if not found
      }
    }

    totalWaterCharge *= multiplier; // Apply the multiplier for non-domestic connections

    return totalWaterCharge;
  } catch (error) {
    console.error("Error in calculateWaterCharges:", error.message);
    throw error;
  }
};

// Main Bill Generation Function
exports.generateBill = async (req, res) => {
  const {
    category_id: originalCategoryId,
    connection_size_id,
    sewerage,
    stp,
    rebate,
    currMonth,
    prevMonth,
    connection_type_id,
  } = req.body;

  try {
    // Basic validations
    if (!originalCategoryId || !connection_size_id || !currMonth) {
      return res.status(400).json({ message: "Invalid payload" });
    }

    const monthData = [];

    // Prepare month data to loop over, ensuring proper structure for CW logic
    if (currMonth) {
      monthData.push({ label: "Current Month", ...currMonth });
    }
    if (prevMonth && originalCategoryId === 1) {
      monthData.unshift({ label: "Previous Month", ...prevMonth }); // Add previous month first
    }

    const resultDetails = [];
    let totalBill = 0;

    for (const month of monthData) {
      let { label, consumption, reading_date, meter_status_id, cw } = month;

      if (!consumption) {
        return res
          .status(400)
          .json({ message: `Consumption missing for ${label}` });
      }

      let meterStatusData = await db.meterStatus.findOne({
        where: {
          id: meter_status_id.id,
        },
      });
      console.log("meterStatusData", meterStatusData.meter_status);

      if (meterStatusData.meter_status != "mf") {
        if(meterStatusData.calc_rule == "average") {
            consumption = 19800;
        } else {
            consumption = 0;
        }
      }

      // Throw error if CW is true but the category_id is not 1
      if (cw && originalCategoryId !== 1) {
        return sendErrorResponse({
          res,
          err: {},
          msg: `Invalid category_id for CW flag in ${label}. If CW is true, category_id must be 1.`,
        });
      }

      // Use CW logic: adjust category ID based on CW property for the specific month
      const category_id = cw ? 2 : originalCategoryId;

      // Calculate water charges
      let waterCharges = await calculateWaterCharges({
        category_id,
        connection_size_id,
        consumption,
        connection_type_id,
      });

      // Fetch minimum charges
      const minimumChargeTariff = await db.tariffConfiguration.findOne({
        where: {
          category_id,
          connection_size_id,
          charge_type_id: 4,
        },
      });

      const minimumCharge = minimumChargeTariff?.ratePerThousand || 0;

      // Final water charge, applying minimum charge logic
      const finalWaterCharge = Math.max(minimumCharge, waterCharges);

      // Fetch fixed charges
      const fixedChargeTariff = await db.tariffConfiguration.findOne({
        where: {
          category_id,
          connection_size_id,
          charge_type_id: 2,
        },
      });

      const fixedCharge = fixedChargeTariff?.ratePerThousand || 0;

      // Fetch meter service charges
      const meterServiceChargeTariff = await db.tariffConfiguration.findOne({
        where: {
          connection_size_id,
          charge_type_id: 3,
        },
      });

      const meterServiceCharge = meterServiceChargeTariff?.ratePerThousand || 0;

      // Additional charges: Sewerage, STP, IDC, and rebate
      const sewerageCharge = sewerage ? getSewerageCharge(finalWaterCharge) : 0;
      const stpCharge = stp ? getStpCharge(finalWaterCharge) : 0;
      const rebate_applied = rebate ? getRebate(finalWaterCharge) : 0;

      const baseBill =
        finalWaterCharge +
        fixedCharge +
        meterServiceCharge +
        sewerageCharge +
        stpCharge;

      const idcCharge = getIDC(consumption, baseBill);

      // Calculate final bill for this month
      const bill = parseFloat(
        (baseBill + idcCharge - rebate_applied).toFixed(2)
      );

      const monthCharges = {
        label,
        consumption,
        cw, // Track CW logic
        reading_date,
        meter_status_id,
        fixedCharge,
        minimumCharge,
        waterCharge: finalWaterCharge,
        meterServiceCharge,
        sewerageCharge,
        stpCharge,
        idcCharge,
        rebate_applied,
        bill,
      };

      totalBill += bill;
      resultDetails.push(monthCharges);
    }

    // Late payment surcharge (LPS) and total bill including LPS
    const lps = Math.round((totalBill * 10) / 100);
    const totalBillWithLPS = totalBill + lps;

    // Response payload
    return sendResponse({
      res,
      data: {
        message: "Bill generated successfully",
        billDetails: {
          detailsByMonth: resultDetails,
          totalBill,
          lps,
          totalBillWithLPS,
        },
      },
    });
  } catch (err) {
    // Handle and return errors gracefully
    return sendErrorResponse({
      res,
      err,
      msg: "Failed to generate bill",
    });
  }
};
