const db = require("../models");
const Category = db.categories;
const Slab = db.slabs;
const ChargeType = db.chargeType;

const ConnectionSize = db.connectionSize;

const { getChargesName } = require("../utils/common");
const { sendErrorResponse, sendResponse } = require("../utils/lib");

// Reuse calculateWaterCharges logic here or adapt if slab-based logic differs
const calculateWaterCharges = async ({
  category_id,
  connection_size_id,
  consumption,
  connection_type_id,
}) => {
  try {
    // Determine if bulk is false based on connection_size_id
    const isBulk = !(
      connection_size_id == 1 ||
      connection_size_id == 2 ||
      connection_size_id == 3
    );

    // Step 1: Fetch Tariff Configuration and Slabs
    const tariffs = await db.tariffConfiguration.findAll({
      where: { category_id, charge_type_id: 1 }, // charge_type_id = 1 for waterCharges
      include: [
        {
          model: db.slabs,
          as: "slab",
          // attributes: ["min_consumption", "max_consumption"],
          attributes: ["min_consumption", "max_consumption", "isBulk"],
          where: isBulk, // Enforce the bulk condition
        },
      ],
      order: [[{ model: db.slabs, as: "slab" }, "min_consumption", "ASC"]],
    });

    if (!tariffs || tariffs.length === 0) {
      throw new Error(
        "No water tariff configurations found for the given category and connection size."
      );
    }

    // Step 2: Calculate Water Charges Slab-wise
    let totalWaterCharge = 0;
    let remainingConsumption = consumption;

    for (const tariff of tariffs) {
      const { ratePerThousand, slab } = tariff;
      const { min_consumption, max_consumption } = slab;

      const slabMin = min_consumption || 0;
      const slabMax = max_consumption || remainingConsumption;

      // Calculate applicable consumption for this slab
      const applicableConsumption = Math.min(
        remainingConsumption,
        slabMax - slabMin
      );

      if (applicableConsumption > 0) {
        // Calculate charges for the applicable consumption
        totalWaterCharge += (applicableConsumption / 1000) * ratePerThousand;
        remainingConsumption -= applicableConsumption;
      }

      // Break loop if all consumption is accounted for
      if (remainingConsumption <= 0) break;
    }

    if (remainingConsumption > 0) {
      throw new Error(
        "Remaining consumption exceeds slab limits. Check tariff configuration."
      );
    }

    if (connection_type_id === 2) {
      totalWaterCharge *= 1.5;
    }

    return totalWaterCharge;
  } catch (error) {
    console.error("Error in calculateWaterCharges:", error.message);
    throw error;
  }
};

function getSewerageCharge(waterCharge) {
  console.log('waterCharge getSewerageCharge', waterCharge)

  let sewerageCharge = (waterCharge * 20) / 100;
  // return sewerageCharge;
  return parseFloat(sewerageCharge.toFixed(2));
}

function getStpCharge(waterCharge) {
  console.log('waterCharge getStpCharge', waterCharge)
  // 13% of water charge whatever the connection category is
  let stpCharge = (waterCharge * 13) / 100;
  // return stpCharge;
  return parseFloat(stpCharge.toFixed(2));
}

const idc = [
  { min: 15001, max: 40000, chargePercent: 25 },
  { min: 40001, max: Infinity, chargePercent: 35 },
];
function getIDC(consumption, bill) {
  let idcData = idc.find((id) => {
    return consumption >= id.min && consumption <= id.max;
  });
  // let idcharge = idcData ? (waterCharge * idcData.chargePercent) / 100 : 0;
  let idcharge = idcData ? (bill * idcData.chargePercent) / 100 : 0;
  return parseFloat(idcharge.toFixed(2));
}
function getRebate(waterCharge) {
  let rebateCharge = (waterCharge * rebates[0]?.discount) / 100;

  return parseFloat(rebateCharge.toFixed(2));
}

exports.generateBill = async (req, res) => {
  const {
    category_id,
    connection_size_id,
    sewerage,
    stp,
    rebate,
    currMonth,
    prevMonth,
    last_reading,
    last_reading_date,
    connection_type_id,
  } = req.body;

  try {
    // Validation: Ensure payload contains required fields
    if (!category_id || !connection_size_id || !currMonth) {
      return res.status(400).json({ message: "Invalid payload" });
    }

    // Only include `prevMonth` if `category_id === 1`
    const monthData =
      category_id === 1
        ? [
            { label: "Previous Month", ...prevMonth },
            { label: "Current Month", ...currMonth },
          ]
        : [{ label: "Current Month", ...currMonth }];

    const resultDetails = [];
    let totalBill = 0;
    let lps = 0;

    let totaoBillwithLPS = 0;

    // Process each month independently
    for (const month of monthData) {
      const { label, consumption, reading_date, meter_status_id } = month;

      if (!consumption) {
        return res
          .status(400)
          .json({ message: `Consumption missing for ${label}` });
      }

      // Calculate charges for the month
      let waterCharges = 0;
      let minimumCharge = 0;

      // Fetch Minimum Charge Tariff
      const minimumChargeTariff = await db.tariffConfiguration.findOne({
        where: {
          category_id,
          connection_size_id,
          charge_type_id: 4, // Minimum Charges
        },
      });

      if (
        category_id === 1 &&
        connection_size_id === 1 &&
        meter_status_id === 1 &&
        consumption <= 15000
      ) {
        waterCharges = 0;
        minimumCharge = 0;
      } else {
        waterCharges = await calculateWaterCharges({
          category_id,
          connection_size_id,
          consumption,
          connection_type_id,
        });

        minimumCharge = minimumChargeTariff?.ratePerThousand || 0;
        // Apply multiplier if connection_type_id === 2
        if (connection_type_id === 2) {
          minimumCharge *= 1.5;
        }
      }

      // Fetch Fixed Charge Tariff
      const fixedChargeTariff = await db.tariffConfiguration.findOne({
        where: {
          category_id,
          connection_size_id,
          charge_type_id: 2, // Fixed Charges
        },
      });
console.log('fixedChargeTariff', fixedChargeTariff)
      const fixedCharge = fixedChargeTariff?.ratePerThousand || 0;

      // Fetch Meter Service Charge Tariff
      const meterServiceChargeTariff = await db.tariffConfiguration.findOne({
        where: {
          connection_size_id,
          charge_type_id: 3, // Meter Service Charges
        },
      });

      const meterServiceCharge = meterServiceChargeTariff?.ratePerThousand || 0;

      // Calculate Final Water Charge
      const finalWaterCharge = Math.max(minimumCharge, waterCharges);

      // Apply Sewerage and STP Charges
      let sewerageCharge = sewerage ? getSewerageCharge(finalWaterCharge) : 0;
      console.log('stp', stp)
      let stpCharge = stp ? getStpCharge(finalWaterCharge) : 0;

      // Apply Rebate
      let rebate_applied = rebate ? getRebate(finalWaterCharge) : 0;

      // Apply IDC Charges
      let bill =
        fixedCharge +
        finalWaterCharge +
        meterServiceCharge +
        sewerageCharge +
        stpCharge;
      let idcCharge = getIDC(consumption, bill);
      bill = bill + idcCharge - rebate_applied;
      bill = parseFloat(bill.toFixed(2));

      const monthCharges = {
        label,
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

      totalBill += monthCharges.bill;
      totalBill = Math.round(totalBill);

      lps = Math.round(totalBill * 10) / 100;
      resultDetails.push(monthCharges);
    }

    // Return response

    return sendResponse({
      res,
      data: {
        message: "Bill generated successfully",
        billDetails: {
          detailsByMonth: resultDetails,
          totalBill,
          lps,
          totalBillwithLPS: totalBill + lps,
        },
      },
    });
    // return res.status(200).json({});
  } catch (error) {
    return res.status(500).json({ message: "Failed to generate bill", error });
  }
};
