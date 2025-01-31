// const db = require("../models"); // Ensure this path is correct
// const ReadingSheet = db.readingSheets;
// const ConsumerData = db.consumerData;
// const GeneratedBill = db.generatedBill;
// const { Op } = require("sequelize"); // Import Op for Sequelize operators

// // API endpoint to fetch or create a reading sheet
// exports.createReadingSheet = async (req, res) => {
//   try {
//     const { division_no, subdivision_no } = req.query;

//     // Step 1: Fetch consumer data based on division_no and subdivision_no
//     const consumers = await ConsumerData.findAll({
//       where: {
//         division: division_no,
//         subdivision_number: subdivision_no,
//       },
//       attributes: ["chk", "grup", "cin_number"], // Add necessary fields
//     });

//     if (consumers.length === 0) {
//       return res.status(404).json({
//         message: "No consumer data found for the given division and subdivision.",
//       });
//     }

//     // Fetch corresponding generated bill data for each consumer
//     const consumerCINs = consumers.map((consumer) => consumer.cin_number);

//     const generatedBills = await GeneratedBill.findAll({
//       where: {
//         cin_number: {
//           [Op.in]: consumerCINs,
//         },
//       },
//       attributes: ["cin_number", "due_date_by_cheque", "due_date_by_cash", "curr_reading_date", "bill_issue_date"],
//     });

//     if (generatedBills.length === 0) {
//       return res.status(404).json({ message: "No generated bills found for the consumers." });
//     }
// console.log('generatedBills', generatedBills)
//     // Function to get the first available non-null date
//     const getFirstNonNullDate = (datesArray) => {
//       return datesArray.find((date) => date !== null && date !== undefined) || null;
//     };

//     // Extract all relevant dates from generated bills
//     const allBillIssueDates = generatedBills.map((bill) => bill.bill_issue_date);
//     const allCashDueDates = generatedBills.map((bill) => bill.due_date_by_cash);
//     const allChequeDueDates = generatedBills.map((bill) => bill.due_date_by_cheque);
// console.log('allCashDueDates', allCashDueDates)
// console.log('allChequeDueDates', allChequeDueDates)
//     // Get first available non-null dates
//     const bill_issue_date = getFirstNonNullDate(allBillIssueDates);
//     const due_date_cash = getFirstNonNullDate(allCashDueDates);
//     const due_date_cheque = getFirstNonNullDate(allChequeDueDates);

//     if (!bill_issue_date) {
//       return res.status(400).json({ message: "No valid bill issue date found in the generated bills." });
//     }

//     // if (!due_date_cash || !due_date_cheque) {
//     //   return res.status(400).json({ message: "No valid due date found in the generated bills." });
//     // }

//     // Extract and sort reading dates to find min & max
//     const readingDates = generatedBills
//       .map((bill) => bill.curr_reading_date)
//       .filter((date) => date !== null); // Remove null values

//     if (readingDates.length === 0) {
//       return res.status(400).json({ message: "No valid reading dates found." });
//     }

//     readingDates.sort((a, b) => new Date(a) - new Date(b)); // Sort dates

//     const reading_from_date = readingDates[0]; // Minimum date
//     const reading_to_date = readingDates[readingDates.length - 1]; // Maximum date

//     // Step 3: Check if a reading sheet already exists for the given month and year
//     const monthYear = new Date(reading_from_date).toISOString().slice(0, 7); // Format YYYY-MM

//     const existingReadingSheet = await ReadingSheet.findOne({
//       where: {
//         division_no,
//         subdivision_no,
//         chk: consumers[0]?.chk, // Assuming first consumer represents the group
//         grup: consumers[0]?.grup,
//         reading_from_date: {
//           [Op.like]: `${monthYear}%`, // Validate based on the month-year format
//         },
//       },
//     });

//     if (existingReadingSheet) {
//       return res.status(400).json({
//         message: `Reading sheet already exists for ${monthYear} for the provided chk and grup.`,
//       });
//     }

//     // Step 4: Insert new reading sheet entry
//     const newReadingSheet = await ReadingSheet.create({
//       division_no,
//       subdivision_no,
//       chk: consumers[0]?.chk,
//       grup: consumers[0]?.grup,
//       reading_from_date,
//       reading_to_date,
//       bill_issue_date, // Correct bill issue date
//       due_date_cash: due_date_cash != null ? due_date_cash : new Date(),
//       due_date_cheque: due_date_cheque != null ? due_date_cheque : new Date(),
//     });

//     return res.status(201).json({
//       message: "Reading sheet created successfully",
//       data: newReadingSheet,
//     });

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// };

const db = require("../models"); // Ensure this path is correct
const ReadingSheet = db.readingSheets;
const ConsumerData = db.consumerData;
const GeneratedBill = db.generatedBill;
const { Op } = require("sequelize"); // Import Op for Sequelize operators

// API endpoint to fetch or create reading sheets for all chk and grup combinations
exports.createReadingSheet = async (req, res) => {
  try {
    const { division_no, subdivision_no } = req.query;

    // Step 1: Fetch all consumers for the given division and subdivision
    const consumers = await ConsumerData.findAll({
      where: {
        division: division_no,
        subdivision_number: subdivision_no,
      },
      attributes: ["chk", "grup", "cin_number"],
    });

    if (consumers.length === 0) {
      return res.status(404).json({ message: "No consumer data found for the given division and subdivision." });
    }

    // Extract unique chk & grup combinations
    const groupedConsumers = consumers.reduce((acc, consumer) => {
      const key = `${consumer.chk}-${consumer.grup}`;
      if (!acc[key]) {
        acc[key] = { chk: consumer.chk, grup: consumer.grup, cin_numbers: [] };
      }
      acc[key].cin_numbers.push(consumer.cin_number);
      return acc;
    }, {});

    // Prepare reading sheet entries
    const readingSheets = [];

    // Loop through each chk & grup combination
    for (const key in groupedConsumers) {
      const { chk, grup, cin_numbers } = groupedConsumers[key];

      // Fetch corresponding generated bill data
      const generatedBills = await GeneratedBill.findAll({
        where: {
          cin_number: { [Op.in]: cin_numbers },
        },
        attributes: ["cin_number", "due_date_by_cheque", "due_date_by_cash", "curr_reading_date", "bill_issue_date"],
      });

      if (generatedBills.length === 0) continue; // Skip if no bills found for this group

      // Function to get the first available non-null date
      const getFirstNonNullDate = (datesArray) => datesArray.find((date) => date !== null && date !== undefined) || null;

      // Extract relevant dates
      const billIssueDates = generatedBills.map((bill) => bill.bill_issue_date);
      const cashDueDates = generatedBills.map((bill) => bill.due_date_by_cash);
      const chequeDueDates = generatedBills.map((bill) => bill.due_date_by_cheque);
      const readingDates = generatedBills.map((bill) => bill.curr_reading_date).filter((date) => date !== null);

      if (readingDates.length === 0) continue; // Skip if no valid reading dates found

      // Get the first non-null bill issue and due dates
      const bill_issue_date = getFirstNonNullDate(billIssueDates);
      const due_date_cash = getFirstNonNullDate(cashDueDates) || new Date();
      const due_date_cheque = getFirstNonNullDate(chequeDueDates) || new Date();

      // Sort and determine the reading period
      readingDates.sort((a, b) => new Date(a) - new Date(b));
      const reading_from_date = readingDates[0];
      const reading_to_date = readingDates[readingDates.length - 1];

      // Ensure no duplicate reading sheet exists
      const monthYear = new Date(reading_from_date).toISOString().slice(0, 7); // YYYY-MM

      const existingReadingSheet = await ReadingSheet.findOne({
        where: {
          division_no,
          subdivision_no,
          chk,
          grup,
          reading_from_date: { [Op.like]: `${monthYear}%` },
        },
      });

      if (!existingReadingSheet) {
        // Add to reading sheets list
        readingSheets.push({
          division_no,
          subdivision_no,
          chk,
          grup,
          reading_from_date,
          reading_to_date,
          bill_issue_date,
          due_date_cash,
          due_date_cheque,
        });
      }
    }

    // Insert all new reading sheets
    if (readingSheets.length > 0) {
      await ReadingSheet.bulkCreate(readingSheets);
      return res.status(201).json({ message: "Reading sheets created successfully", data: readingSheets });
    } else {
      return res.status(400).json({ message: "No new reading sheets were created." });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
