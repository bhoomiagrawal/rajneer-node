const db = require("../models");
const Category = db.categories;
const Slab = db.slabs;
const ChargeType = db.chargeType;

const ConnectionSize = db.connectionSize;

const { getChargesName } = require("../utils/common");
const { sendErrorResponse, sendResponse } = require("../utils/lib");
const { tariffValidation } = require("../utils/validation");

// exports.create = [
//     // ...tariffValidation,

//     async (req, res) => {
//         const { charge_type_id, connection_size_id, category_id, slab_id, ratePerThousand, sso_id } = req.body;

//         const transaction = await db.sequelize.transaction();

//         const ChargeTypeData = await ChargeType.findByPk(charge_type_id);

//         const charge_name = getChargesName(charge_type_id, ChargeTypeData);
//         console.log('charge_name', charge_name)

//         if(charge_name !== "meterServiceCharges") {

//             // Check for category id exist or not
//             const catData = await Category.findByPk(category_id);
//             if (!catData) {
//                 return sendErrorResponse({res, msg:"Category not found",status:400})
//             }

//         }

//         // Check for connection size id exist or not
//         const connectionSizeData = await ConnectionSize.findByPk(connection_size_id);
//         if (!connectionSizeData) {
//             return sendErrorResponse({res, msg:"Connection size not found",status:400})
//         }
//         if(charge_name=="waterCharges") {
//             // check slab id exists
//             const slabData = await Slab.findByPk(slab_id);
//             if (!slabData) {
//                 return sendErrorResponse({res, msg:"Slab not found",status:400})
//             }

//         }
//         try {
//             // Create a new tariff configuration
//             const newTariff = await db.tariffConfiguration.create(
//                 {
//                     charge_type_id,
//                     connection_size_id,

//                     category_id: charge_name !== "meterServiceCharges" ? category_id : null,

//                     slab_id: charge_name == "waterCharges" ? slab_id : null,
//                     ratePerThousand,
//                     created_by: sso_id,
//                 },
//                 { transaction }
//             );

//             // Additional entry based on charge_type_id
//             if (charge_name === "waterCharges") {
//                 await db.waterCharges.create(
//                     {
//                         tariff_id: newTariff.id,
//                         category_id, // Save the category with the water charge,
//                         connection_size_id,
//                         slab_id,
//                         extra_details: req.body.extra_details || null, // Example additional field
//                     },
//                     { transaction }
//                 );
//             } else if (charge_name == "minimumCharges") {
//                 await db.minimumCharges.create(
//                     {
//                         tariff_id: newTariff.id,
//                         category_id, // Save the category with the water charge
//                         connection_size_id,
//                         minimum_charge: ratePerThousand,
//                         extra_details: req.body.extra_details || null, // Example additional field
//                     },
//                     { transaction }
//                 );
//             }
//             else if (charge_name == "fixedCharges") {
//                 await db.fixedCharges.create(
//                     {
//                         tariff_id: newTariff.id,
//                         category_id, // Save the category with the water charge
//                         connection_size_id,
//                         fixed_charge: ratePerThousand
//                     },
//                     { transaction }
//                 );
//             }
//             else if (charge_name == "meterServiceCharges") {
//                 await db.meterServices.create(
//                     {
//                         tariff_id: newTariff.id,
//                         category_id, // Save the category with the water charge
//                         connection_size_id,
//                         meter_service_charge: ratePerThousand
//                     },
//                     { transaction }
//                 );
//             }
//             // Commit the transaction
//             await transaction.commit();

//             return res.status(201).json({
//                 message: "Tariff created successfully.",
//                 data: newTariff,
//             });
//         } catch (error) {
//             // Rollback transaction on error
//             await transaction.rollback();
//             console.error("Error:", error);
//             res.status(500).json({ message: "Failed to create tariff.", error });
//         }
//     }

// ]

exports.create = [
  async (req, res) => {
    const {
      charge_type_id,
      category_id,
      tariff,
      connection_size_id,
      ratePerThousand,
      sso_id,
      extra_details,
    } = req.body;

    // Start transaction
    const transaction = await db.sequelize.transaction();

    // Array to store newly created tariffs
    const createdTariffs = [];

    try {
      // Fetch Charge Type Data
      const ChargeTypeData = await ChargeType.findByPk(charge_type_id);
      const charge_name = getChargesName(charge_type_id, ChargeTypeData);
      if (!charge_name) {
        throw new Error("Invalid charge type");
      }

      // Validate category if required
      if (charge_name !== "meterServiceCharges" && category_id) {
        const categoryExists = await validateExistence(
          Category,
          category_id,
          "Category"
        );
        if (!categoryExists)
          throw new Error(`Category with ID ${category_id} not found`);
      }

      // Validate tariffs as array
      if (!Array.isArray(tariff) || tariff.length === 0) {
        throw new Error("Tariff data is required as a non-empty array");
      }

      // Process tariffs

      for (const trf of tariff) {
        const { slab_id, rate } = trf;
        const connSizeId = connection_size_id || trf.connection_size_id;

        // Common validations
        if (
          [
            "waterCharges",
            "fixedCharges",
            "minimumCharges",
            "meterServiceCharges",
          ].includes(charge_name)
        ) {
          const connSizeExists = await validateExistence(
            ConnectionSize,
            connSizeId,
            "Connection Size"
          );
          if (!connSizeExists)
            throw new Error(`Connection Size with ID ${connSizeId} not found`);
        }
        if (charge_name === "waterCharges" && slab_id) {
          const slabExists = await validateExistence(Slab, slab_id, "Slab");
          if (!slabExists) throw new Error(`Slab with ID ${slab_id} not found`);
        }

        // Create a tariff configuration
        const newTariff = await db.tariffConfiguration.create(
          {
            charge_type_id,
            connection_size_id: connSizeId,
            category_id:
              charge_name !== "meterServiceCharges" ? category_id : null,
            slab_id: slab_id || null,
            ratePerThousand: rate || ratePerThousand,
            created_by: sso_id,
          },
          { transaction }
        );

        // Store newly created tariff in the array
        createdTariffs.push(newTariff);
        // Create specific charge record
        if (charge_name === "fixedCharges") {
          await db.fixedCharges.create(
            {
              tariff_id: newTariff.id,
              category_id,
              connection_size_id: connSizeId,
              fixed_charge: rate,
            },
            { transaction }
          );
        } else if (charge_name === "minimumCharges") {
          await db.minimumCharges.create(
            {
              tariff_id: newTariff.id,
              category_id,
              connection_size_id: connSizeId,
              minimum_charge: rate,
            },
            { transaction }
          );
        } else if (charge_name === "meterServiceCharges") {
          await db.meterServices.create(
            {
              tariff_id: newTariff.id,
              connection_size_id: connSizeId,
              meter_service_charge: rate,
            },
            { transaction }
          );
        } else if (charge_name === "waterCharges") {
          await db.waterCharges.create(
            {
              tariff_id: newTariff.id,
              category_id,
              connection_size_id: connSizeId,
              slab_id,
              extra_details: extra_details || null,
            },
            { transaction }
          );
        }
      }

      // Commit the transaction
      await transaction.commit();
      return res
        .status(201)
        .json({ message: "Tariff created successfully.", createdTariffs });
    } catch (error) {
      // Rollback transaction only if it's not already committed
      if (!transaction.finished) {
        await transaction.rollback();
      }
      console.error("Error:", error);
      return res
        .status(500)
        .json({ message: "Failed to create tariff.", error });
    }
  },
];

// Reusable validation function
async function validateExistence(model, id, name) {
  const record = await model.findByPk(id);
  return !!record;
}
