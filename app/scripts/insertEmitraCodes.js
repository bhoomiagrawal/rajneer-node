const { RelationEmitraSubdivision } = require("../models"); // Adjust path as necessary
const emitraCodesData = require("./emitracodes.json"); // Assuming the file path for emitraCodes.json

/**
 * Function to insert Emiatra Code data from the emitracodes JSON file
 * into the relationEmitraSubdivision table.
 * Separates invalid or problematic objects for review with detailed validation errors.
 */
const insertEmitra = async () => {
  const invalidEntries = []; // To store invalid or problematic emitra code entries

  try {
    // Start a Sequelize transaction
    const transaction = await RelationEmitraSubdivision.sequelize.transaction();

    try {
      // Process each entry from the emitracodes JSON file
      for (const entry of emitraCodesData) {
        // if (entry.o_subdivision_id && entry.emitra_code) {
          try {
            // Insert the data into the relationEmitraSubdivision table
            let test = await RelationEmitraSubdivision.create(
              {
                o_subdivision_id: entry.o_subdivision_id,  // Corresponding office_id (subdivision_id)
                emitra_code: entry.emitra_code,             // Emitra code for the subdivision
              },
              { transaction }
            );

            console.log('test', test)
          } catch (error) {
            invalidEntries.push({
              entry,
              errorType: "Insertion Error",
              message: error.message,
            });
          }
        // }
      }

      // Commit the transaction if all went well
      await transaction.commit();
      console.log("Successfully inserted emitra code data.");
    } catch (error) {
      // Rollback transaction if any issue occurred
      await transaction.rollback();
      console.error("Transaction failed and rolled back:", error.message);
    }
  } catch (err) {
    console.error("Error during operation:", err.message);
  }

  // Log invalid or problematic data for review
  if (invalidEntries.length) {
    console.log("Invalid Emiatra Code Entries Found:", JSON.stringify(invalidEntries, null, 2));
  }
};

module.exports = insertEmitra;
