const db = require("../models");
const Category = db.categories;
const Slab = db.slabs;
const ChargeType = db.chargeType;

const ConnectionSize = db.connectionSize;

const { getChargesName } = require("../utils/common");
const { sendErrorResponse, sendResponse } = require("../utils/lib");
const { tariffValidation } = require("../utils/validation");

exports.create = [
  async (req, res) => {
    const {
      charge_type_id,
      category_id,
      tariff,
      connection_size_id,
      ratePerThousand,
      chargePercent,
      sso_id,
      extra_details
      
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

      // Special handling for sewerage charges
      if (charge_name === "sewerageCharges") {
        if (!chargePercent) {
          throw new Error("chargePercent is required for sewerage charges.");
        }

        // Create tariff configuration
        const sewerageTariff = await db.tariffConfiguration.create(
          {
            charge_type_id,
            connection_size_id: null,
            category_id: null,
            slab_id: null,
            ratePerThousand: null,
            chargePercent,
            created_by: sso_id,
          },
          { transaction }
        );

        // Create sewerage charge entry
        await db.sewerageCharges.create(
          {
            tariff_id: sewerageTariff.id,
            chargePercent,
          },
          { transaction }
        );

        createdTariffs.push(sewerageTariff);
      } 
      // Special handling for STP charges
      else if (charge_name === "stpCharges") {
        if (!chargePercent) {
          throw new Error("chargePercent is required for STP charges.");
        }

        // Create tariff configuration
        const stpTariff = await db.tariffConfiguration.create(
          {
            charge_type_id,
            connection_size_id: null,
            category_id: null,
            slab_id: null,
            ratePerThousand: null,
            chargePercent,
            created_by: sso_id,
          },
          { transaction }
        );

        // Create STP charge entry
        await db.stpCharges.create(
          {
            tariff_id: stpTariff.id,
            chargePercent,
          },
          { transaction }
        );

        createdTariffs.push(stpTariff);
      }
      // Special handling for IDC charges
      else if (charge_name === "idcCharges") {
        if (!chargePercent) {
          throw new Error("chargePercent is required for IDC charges.");
        }
        if (!req.body.slab_id) {
          throw new Error("slab is required for IDC charges.");
        }

        // Create tariff configuration
        const idcTariff = await db.tariffConfiguration.create(
          {
            charge_type_id,
            connection_size_id: null,
            category_id: null,
            slab_id:req.body.slab_id,
            ratePerThousand: null,
            chargePercent,
            created_by: sso_id,
          },
          { transaction }
        );

        // Create IDC charge entry
        await db.idcCharges.create(
          {
            tariff_id: idcTariff.id,
            chargePercent,
          },
          { transaction }
        );

        createdTariffs.push(idcTariff);
      } 
      else {
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
              throw new Error(
                `Connection Size with ID ${connSizeId} not found`
              );
          }
          // if (charge_name === "waterCharges" && slab_id) {
          //   const slabExists = await validateExistence(Slab, slab_id, "Slab");

          //   if (!slabExists)
          //     throw new Error(`Slab with ID ${slab_id} not found`);
          // }

          // Determine if the bulk flag should be true or false based on connection_size_id
          const isBulk = !(
            connSizeId === 1 ||
            connSizeId === 2 ||
            connSizeId === 3
          );

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

          // Additional records for other charge types
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
                isBulk,
              },
              { transaction }
            );
          }
        }
      }

      // Commit the transaction
      await transaction.commit();
      return sendResponse({
        res,
        data: { message: "Tariff created successfully.", createdTariffs },
      });
    } catch (err) {
      // Rollback transaction only if it's not already committed
      if (!transaction.finished) {
        await transaction.rollback();
      }
      console.log("err", err);
      return sendErrorResponse({
        res,
        err,
        msg: "Failed to create tariff.",
      });
    }
  },
];

// Reusable validation function
async function validateExistence(model, id, name) {
  const record = await model.findByPk(id);
  return !!record;
}





