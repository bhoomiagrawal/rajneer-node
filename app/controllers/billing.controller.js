const db = require("../models");

const { sendErrorResponse, sendResponse } = require("../utils/lib");

// Utility functions for other charges
const getSewerageCharge = async (waterCharge) => {
  // Fetch sewerage charges
  const sewerageChargeTariff = await db.tariffConfiguration.findOne({
    where: {
      charge_type_id: 5,
    },
  });
  const seweragePercent = sewerageChargeTariff?.chargePercent || 0;

  return parseFloat(((waterCharge * seweragePercent) / 100).toFixed(2));
};

const getStpCharge = async (waterCharge) => {
  // Fetch stp charges
  const stpChargeTariff = await db.tariffConfiguration.findOne({
    where: {
      charge_type_id: 6,
    },
  });
  const stpPercent = stpChargeTariff?.chargePercent || 0;

  return parseFloat(((waterCharge * stpPercent) / 100).toFixed(2));
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
// temporary comment working on it
// // const idc = [
// //   { min: 15001, max: 40000, chargePercent: 25 },
// //   { min: 40001, max: Infinity, chargePercent: 35 },
// // ];
// const getIDC = async (consumption, bill) => {
//   // Fetch idc charges
//   const idcTariffs = await db.tariffConfiguration.findAll({
//     where: {
//       charge_type_id: 7,
//     },
//     include: [
//       {
//         model: db.slabs,
//         as: "slab",
//         attributes: ["min_consumption", "max_consumption"],
//       },
//     ],
//   });

//   let idcData = idcTariffs.find((idc) => {
//     let min_consumption = idc.slab.min_consumption || 0;
//     let max_consumption = idc.max_consumption || Infinity;
//     return (
    
//       consumption >= min_consumption &&
//       consumption <= max_consumption
//     );
//   });
//   console.log('idcData', consumption, "asdasdasd", idcData)
//   let idcharge = idcData ? (bill * idcData.chargePercent) / 100 : 0;
//   return parseFloat(idcharge.toFixed(2));
// };

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
    let tariffs = [];

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
        where: { category_id, charge_type_id: 1, connection_size_id:1 },
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
    console.log("tariffs value is :-", tariffs);
    if (!tariffs || tariffs.length === 0) {
      throw new Error(
        "No water tariff configurations found for the given category/connection size or bulk status."
      );
    }
    let totalWaterCharge = 0;
    let remainingConsumption = consumption;
    let consumptionSlabs = [];
    let bCharge = 0;
    let previousMax = 0;

    for (const tariff of tariffs) {
      const { ratePerThousand } = tariff;
        const { slab } = tariff;
        console.log("slab::::::::", slab)
        let  slabMin = slab?.min_consumption || 0;
        let  slabMax = slab?.max_consumption == null || slab?.max_consumption == "" ? Infinity : slab?.max_consumption;
        if(slab)slab.ratePerThousand = ratePerThousand;
        
        consumptionSlabs.push(slab);

     
        console.log("consumption::::::::", consumption)
        console.log("slabMax::::::::", slabMax)
        if(!isBulk) {

          if (consumption <= slabMax) {
          
              console.log("entring in consumption <= slabMax part:::::: consumption is,", consumption, "and slabMax is::::", slabMax, "::::::")
              console.log("Slabmax values is:::", slabMax, "   and previousmax vlues is:::: ", previousMax, "   so the difference is::: ", consumption - previousMax, "   : for rate per thousand is::", ratePerThousand, "  ::")
              bCharge += ((consumption - previousMax) / 1000) * ratePerThousand;
  
              console.log("bCharge::::::::", bCharge)
            break;
          } else {
  
            console.log("entring in else part::::::")
            console.log("Slabmax values is:::", slabMax, "   and previousmax vlues is:::: ", previousMax, "   so the difference is::: ", slabMax - previousMax, "   : for rate per thousand is::", ratePerThousand, "  ::")
            bCharge += ((slabMax - previousMax) / 1000) * ratePerThousand;
  
            previousMax = slabMax;
  
            console.log("bCharge:::::::: in else part", bCharge)
          console.log("previousMax::::::::", previousMax)
  
          }

        } else {

            bCharge = (consumption / 1000) * ratePerThousand;
            console.log("bCharge", bCharge)
        }
       
    }
    totalWaterCharge = bCharge;
  //       console.log("slab:::::::", slab);
  //       console.log("slabMin:::::::", slabMin);
  //       console.log("slabMax:::::::", slabMax);
        
  //     }

  //     let applicableConsumption = Math.min(
  //       remainingConsumption,
  //       slabMax - slabMin
  //     );

  //     if (applicableConsumption > 0) {
  //       totalWaterCharge += (applicableConsumption / 1000) * ratePerThousand;
  //       remainingConsumption -= applicableConsumption;
  //     }
  //     console.log('applicableConsumption', applicableConsumption);
  // console.log('remainingConsumption', remainingConsumption);
  //     if (remainingConsumption <= 0) break;

    if (connection_type_id === 2) {
      totalWaterCharge *= 1.5; // Apply 1.5x multiplier for tenant connections
    }

    return { waterCharges: totalWaterCharge, consumptionSlabs };
  }

   
   catch (error) {
    console.error("Error in calculateWaterCharges:", error.message);
    throw error;
  }
};

// Main Bill Generation Function
exports.generateBill = async (req, res) => {

  const { billingData } = req.body; // Accept an array of billing data objects.
 
console.log('billingData', billingData)
  // const {
  //   category_id: originalCategoryId,
  //   connection_size_id,
  //   sewerage,
  //   stp,
  //   rebate,
  //   currMonth,
  //   prevMonth,
  //   connection_type_id,
  // } = req.body;

  try {

    if (!billingData || billingData.length === 0) { // Check if billingData array is empty.
      return res.status(400).json({ message: "Invalid payload: No data provided" });
    }

    const generatedBills = [];
    // Loop through each billing object in the array and process them.
    for (const billPayload of billingData) {  // Changed: Loop through the billingData array

       const {
    category_id: originalCategoryId,
    connection_size_id,
    sewerage,
    stp,
    rebate,
    currMonth,
    prevMonth,
    connection_type_id,
  } = billPayload;

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
      let { label, consumption, reading_date, meter_status, cw } = month;

      // if (!consumption) {
      //   return res
      //     .status(400)
      //     .json({ message: `Consumption missing for ${label}` });
      // }

      let meterStatusData = await db.meterStatus.findOne({
        where: {
          id: meter_status.id,
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
      const data = await calculateWaterCharges({category_id,
        connection_size_id,
        consumption,
        connection_type_id,
        isBulk,});
      console.log(data,"<------> data <------>");
      let { waterCharges, consumptionSlabs } = await calculateWaterCharges({
        category_id,
        connection_size_id,
        consumption,
        connection_type_id,
        isBulk,
      });
    console.log(consumptionSlabs," <------> consumptionSlabs ",waterCharges);
      // Fetch additional charges
      const minimumChargeTariff = await db.tariffConfiguration.findOne({
        where: {
          category_id,
          connection_size_id,
          charge_type_id: 4,
        },
      });
      let minimumCharge = minimumChargeTariff?.ratePerThousand || 0;
      console.log("minimumCharge", minimumCharge)

      if (meterStatusData.id == 1 && category_id == 1 && connection_size_id ==1 && consumption <= 15000) {
        waterCharges = 0;
        minimumCharge = 0;
        // consumptionSlabs = []
      }

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
      const sewerageCharge = sewerage
        ? await getSewerageCharge(finalWaterCharge)
        : 0;
      const stpCharge = stp ? await getStpCharge(finalWaterCharge) : 0;
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
        meter_status,
        consumptionSlabs,

        fixedCharge,
        minimumCharge,
        waterCharge: finalWaterCharge,
        meterServiceCharge,
        sewerageCharge,
        stpCharge,
        idcCharge,
        rebate_applied,
        bill,
        billwithoutIDC: baseBill,
      };

      totalBill += bill;
      resultDetails.push(monthCharges);
    }

    // Late payment surcharge (LPS) and total bill including LPS
    const lps = Math.round((totalBill * 10) / 100);
    const totalBillWithLPS = totalBill + lps;

    generatedBills.push({
      detailsByMonth: resultDetails,
      totalBill,
      lps,
      totalBillWithLPS,
      ...billPayload
    })
  }
    // Response payload
    return sendResponse({
      res,
      data: {
        message: "Bill generated successfully",
        billDetails: generatedBills,
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
