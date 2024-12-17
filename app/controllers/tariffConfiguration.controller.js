


const db = require("../models");
const { tariffValidation } = require("../utils/validation");

exports.createTariffWithCharge = [
    ...tariffValidation,

    async (req, res) => {
        const { charge_type, connection_size_id, category_id, slab_id, ratePerThousand, sso_id } = req.body;

        const transaction = await db.sequelize.transaction();
        try {
            // Create a new tariff configuration
            const newTariff = await db.tariffConfiguration.create(
                {
                    charge_type,
                    connection_size_id,

                    category_id: charge_type !== "meter_service_charge" ? category_id : null,

                    slab_id: charge_type == "water_charges" ? slab_id : null,
                    ratePerThousand,
                    created_by: sso_id,
                },
                { transaction }
            );

            // Additional entry based on charge_type
            if (charge_type === "water_charges") {
                await db.waterCharge.create(
                    {
                        tariff_id: newTariff.id,
                        category_id, // Save the category with the water charge,
                        connection_size_id,
                        slab_id,
                        extra_details: req.body.extra_details || null, // Example additional field
                    },
                    { transaction }
                );
            } else if (charge_type == "minimum_charges") {
                await db.minimumCharge.create(
                    {
                        tariff_id: newTariff.id,
                        category_id, // Save the category with the water charge
                        connection_size_id,
                        extra_details: req.body.extra_details || null, // Example additional field
                    },
                    { transaction }
                );
            } 
            else if (charge_type == "fixed_charges") {
                await db.minimumCharge.create(
                    {
                        tariff_id: newTariff.id,
                        category_id, // Save the category with the water charge
                        connection_size_id,
                        minimumCharge: ratePerThousand
                    },
                    { transaction }
                );
            }
            else if (charge_type == "meter_service_charges") {
                await db.meterServices.create(
                    {
                        tariff_id: newTariff.id,
                        category_id, // Save the category with the water charge
                        connection_size_id,
                        minimumCharge: ratePerThousand
                    },
                    { transaction }
                );
            }
            // Commit the transaction
            await transaction.commit();

            return res.status(201).json({
                message: "Tariff created successfully.",
                data: newTariff,
            });
        } catch (error) {
            // Rollback transaction on error
            await transaction.rollback();
            console.error("Error:", error);
            res.status(500).json({ message: "Failed to create tariff.", error });
        }
    }




]


