const { OfficeLevel, OfficeType, Office } = require("../models"); // Adjust path as necessary
const officeData = require("./office.json");

/**
 * Function to populate data from office JSON into the respective tables.
 * Separates invalid or problematic objects for review with detailed validation errors.
 */
const populateOfficeData = async () => {
  const invalidEntries = []; // To store problematic entries



  try {
    // Start a Sequelize transaction
    const transaction = await OfficeLevel.sequelize.transaction();

    try {
      // Process m_office_level
      for (const office of officeData) {
        try {
          await OfficeLevel.create(
            {
              level_id: parseInt(office.Office_Level_ID, 10),
              level_name: office.Office_Level_Name,
            },
            { transaction }
          );
        } catch (error) {
          // Check if it's a validation error
          if (error.name === "SequelizeValidationError") {
            invalidEntries.push({
              entry: office,
              errorType: "OfficeLevel Validation Error",
              errors: error.errors.map((e) => ({
                message: e.message,
                field: e.path,
                value: e.value,
              })),
            });
          } else {
            invalidEntries.push({
              entry: office,
              errorType: "OfficeLevel Other Error",
              message: error.message,
            });
          }
        }
      }

      // Process m_office_type
      for (const office of officeData) {
        try {
          await OfficeType.create(
            {
              type_id: parseInt(office.Office_Type_Id, 10),
              type_name: office.Org_Office_Type,
            },
            { transaction }
          );
        } catch (error) {
          if (error.name === "SequelizeValidationError") {
            invalidEntries.push({
              entry: office,
              errorType: "OfficeType Validation Error",
              errors: error.errors.map((e) => ({
                message: e.message,
                field: e.path,
                value: e.value,
              })),
            });
          } else {
            invalidEntries.push({
              entry: office,
              errorType: "OfficeType Other Error",
              message: error.message,
            });
          }
        }
      }

      // Process m_office
      for (const office of officeData) {
        try {
          await Office.create(
            {
              office_id: office.Office_ID,
              office_name: office.Office_Name,
              office_short_name: office.Office_Short_Name,
              office_address: office.Office_Address || null,
              dt_created: office?.DT_created?.date ? new Date(office.DT_created.date) : null,
              dt_updated: office?.DT_updated?.date ? new Date(office.DT_updated.date) : null,
              office_level_id: parseInt(office.Office_Level_ID, 10),
              office_type_id: parseInt(office.Office_Type_Id, 10),
              parent_office_id: office.Parent_Office_Id || null,
            },
            { transaction }
          );
        } catch (error) {
          if (error.name === "SequelizeValidationError") {
            invalidEntries.push({
              entry: office,
              errorType: "Office Validation Error",
              errors: error.errors.map((e) => ({
                message: e.message,
                field: e.path,
                value: e.value,
              })),
            });
          } else {
            invalidEntries.push({
              entry: office,
              errorType: "Office Other Error",
              message: error.message,
            });
          }
        }
      }

      // Commit the transaction if all went well
      await transaction.commit();

      // Log success message
      console.log("Successfully added/updated office data.");
    } catch (error) {
      // Rollback transaction if any issue occurred
      await transaction.rollback();
      console.error("Transaction failed and rolled back.", error.message);
    }
  } catch (err) {
    console.error("Error during operation:", err.message);
  }

  // Log invalid or problematic data for review
  if (invalidEntries.length) {
    console.log("Invalid Entries Found:", JSON.stringify(invalidEntries[0], null, 2));
  }
};

module.exports = populateOfficeData;
