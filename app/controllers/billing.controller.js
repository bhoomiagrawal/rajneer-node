const db = require("../models");

const { sendErrorResponse, sendResponse } = require("../utils/lib");

// Utility functions for other charges
const getSewerageCharge = (waterCharge) => {
  return parseFloat(((waterCharge * 20) / 100).toFixed(2));
};

const getStpCharge = (waterCharge) => {
  return parseFloat(((waterCharge * 13) / 100).toFixed(2));
};

const idc = [
  { min: 15001, max: 40000, chargePercent: 25 },
  { min: 40001, max: Infinity, chargePercent: 35 },
];
const getIDC = (consumption, bill) => {
  let idcData = idc.find((id) => {
    return consumption >= id.min && consumption <= id.max;
  });
  let idcharge = idcData ? (bill * idcData.chargePercent) / 100 : 0;
  return parseFloat(idcharge.toFixed(2));
};

const getRebate = (waterCharge, discount = 5) => {
  return parseFloat(((waterCharge * discount) / 100).toFixed(2));
};

const calculateWaterCharges = async ({
  category_id,
  connection_size_id,
  consumption,
  connection_type_id,
  isBulk,
}) => {
  try {
    let waterCharge = 0;
    let fixedCharge = 0;
    let meterServiceCharge = 0;

    let tariffs;

    // Fetch tariffs based on bulk or non-bulk conditions
    if (isBulk) {
      // Bulk tariff calculation (assuming minConsumption = 0 and maxConsumption = Infinity)
      tariffs = await db.tariffConfiguration.findAll({
        where: { category_id, charge_type_id: 1, isBulk: true },
        include: [],
      });
    } else {
      // Non-bulk tariff calculation
      tariffs = await db.tariffConfiguration.findAll({
        where: { category_id, charge_type_id: 1, connection_size_id },
        include: [
          {
            model: db.slabs,
            as: "slab",
            attributes: ["min_consumption", "max_consumption"],
          },
        ],
        order: [[{ model: db.slabs, as: "slab" }, "min_consumption", "ASC"]],
      });
    }

    if (!tariffs || tariffs.length === 0) {
      throw new Error(
        "No water tariff configurations found for the given category/connection size or bulk status."
      );
    }
    let totalWaterCharge = 0;
    let remainingConsumption = consumption;
    console.log("consumption", consumption);
    for (const tariff of tariffs) {
      const { charge_type_id, ratePerThousand } = tariff;

      // Handle the case where isBulk is true
      let slabMin = 0;
      let slabMax = remainingConsumption;

      // If isBulk is false, fetch slab information
      if (!isBulk) {
        const { slab } = tariff;
        slabMin = slab?.min_consumption || 0;
        slabMax = slab?.max_consumption || remainingConsumption;
      }

      let applicableConsumption = Math.min(
        remainingConsumption,
        slabMax - slabMin
      );
      // if (isBulk) {
      //   applicableConsumption = remainingConsumption;
      // }

      if (applicableConsumption > 0) {
        totalWaterCharge += (applicableConsumption / 1000) * ratePerThousand;
        remainingConsumption -= applicableConsumption;
      }

      if (remainingConsumption <= 0) break;
    }

    if (connection_type_id === 2) {
      totalWaterCharge *= 1.5; // Apply 1.5x multiplier for tenant connections
    }

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
    if (!originalCategoryId || !connection_size_id || !currMonth) {
      return res.status(400).json({ message: "Invalid payload" });
    }

    const monthData = [];
    if (currMonth) {
      monthData.push({ label: "Current Month", ...currMonth });
    }
    if (prevMonth && originalCategoryId === 1) {
      monthData.unshift({ label: "Previous Month", ...prevMonth });
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

      if (meterStatusData.meter_status !== "mf") {
        if (meterStatusData.calc_rule === "average") {
          consumption = 19800; // Default if 'average' rule is used
        } else {
          consumption = 10000; // Set to zero if no valid consumption
        }
      }

      if (cw && originalCategoryId !== 1) {
        return sendErrorResponse({
          res,
          err: {},
          msg: `Invalid category_id for CW flag in ${label}. If CW is true, category_id must be 1.`,
        });
      }

      const category_id = cw ? 2 : originalCategoryId;
      const isBulk = !(
        connection_size_id === 1 ||
        connection_size_id === 2 ||
        connection_size_id === 3
      );

      // Calculate charges based on charge_type_id
      const waterCharges = await calculateWaterCharges({
        category_id,
        connection_size_id,
        consumption,
        connection_type_id,
        isBulk,
      });

      // Fetch additional charges
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
        billwithoutIDC: baseBill
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
    console.log("err", err);
    return sendErrorResponse({
      res,
      err,
      msg: "Failed to generate bill",
    });
  }
};
