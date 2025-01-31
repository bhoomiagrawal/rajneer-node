const db = require("../models");
const ConsumerData = db.consumerData;
const GeneratedBill = db.generatedBill;
const { Op, Sequelize } = require("sequelize");

const { sendErrorResponse, sendResponse } = require("../utils/lib");

exports.consumersByChkGroup = async (req, res) => {
  try {
    const { chkGroup, subdivision, division } = req?.params;

    if (!chkGroup || !chkGroup.includes("-")) {
      return sendErrorResponse({
        res,
        msg: "Invalid chk-group format. Expected format: 'CHK-GRP' (e.g., '57A-2').",
      });
    }

    // Extract chk and group from the input
    const [chk, grup] = chkGroup.split("-");

    // Fetch consumers matching the chk-group
    const consumers = await ConsumerData.findAll({
      where: {
        chk: chk,
        grup,
        subdivision_number: subdivision,
        division,
      },
      raw: true, // Fetch plain objects
    });

    if (!consumers.length) {
      return sendResponse({
        res,
        data: [],
        msg: `No consumers found for ${chkGroup}.`,
      });
    }

    // Get current month and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // Current month (0-11)
    const currentYear = currentDate.getFullYear(); // Current year
    const prevMonth = currentMonth - 1 < 0 ? 11 : currentMonth - 1; // Previous month, handle wraparound
    const prevYear = currentMonth - 1 < 0 ? currentYear - 1 : currentYear; // Adjust year if needed

    console.log("currentYear", currentYear);
    console.log("currentMonth", currentMonth);
    console.log("prevYear", prevYear);
    console.log("prevMonth", prevMonth);

    // Function to get bill data for a given month and year using Sequelize's MONTH and YEAR functions
    const getBillDataForMonth = async (year, month) => {
      console.log(`Fetching bill data for year: ${year}, month: ${month + 1}`); // Debugging line

      return await GeneratedBill.findAll({
        where: {
          subdivision_number: subdivision,
          // division,
          [Op.and]: [
            Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('bill_issue_date')), year), // Match the year
            Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('bill_issue_date')), month + 1), // Match the month    
          ],
          cin_number: consumers.map((consumer) => consumer.cin_number),
        },
        raw: true,
      });
    };

    let billData = [];
    let monthToCheck = currentMonth;
    let yearToCheck = currentYear;
    // billData = await getBillDataForMonth(2000, 9);
     billData = await GeneratedBill.findAll({
      where: {
        subdivision_number: subdivision,
        bill_issue_date: {
          [Op.and]: [
            Sequelize.where(Sequelize.fn("YEAR", Sequelize.col("bill_issue_date")), 2020),
            Sequelize.where(Sequelize.fn("MONTH", Sequelize.col("bill_issue_date")), 10)
          ]
        },
        cin_number: consumers.map((consumer) => consumer.cin_number)
      },
      raw: true,
      logging: console.log, // Log the SQL query to inspect it
    });
    
    // Loop through the current and previous months until we get data
    // while (billData.length === 0 && (yearToCheck > 2020 || (yearToCheck === 2020 && monthToCheck >= 0))) {
    //   billData = await getBillDataForMonth(yearToCheck, monthToCheck);

    //   if (billData.length === 0) {
    //     console.log(`No bill data found for year: ${yearToCheck}, month: ${monthToCheck + 1}`);
    //     monthToCheck--; // Check the previous month
    //     if (monthToCheck < 0) {
    //       monthToCheck = 11; // Wrap around to December
    //       yearToCheck--; // Move back to the previous year
    //     }
    //   }
    // }

    console.log('billData:', billData); // Debugging line

    if (billData.length === 0) {
      return sendErrorResponse({
        res,
        msg: `No bill data found for the requested range.`,
      });
    }

    // Add the bill data to the consumer data
    const consumerWithBillData = consumers.map((consumer) => {
      // Find the data for the current and previous month for the consumer
      const currentBill = billData.find(
        (bill) =>
          bill.cin_number === consumer.cin_number 
        // &&
        //   new Date(bill.bill_issue_date).getFullYear() === currentYear &&
        //   new Date(bill.bill_issue_date).getMonth() === currentMonth
      );
      const prevBill = billData.find(
        (bill) =>
          bill.cin_number === consumer.cin_number  
        // &&
        //   new Date(bill.bill_issue_date).getFullYear() === prevYear &&
        //   new Date(bill.bill_issue_date).getMonth() === prevMonth
      );

      return {
        ...consumer,
        avg_consumption: currentBill?.curr_avg_consumption,
        last_reading: currentBill?.curr_reading,
        meter_status_current: currentBill?.curr_meter_status_id,
        meter_status_previous: prevBill?.prev_meter_status_id,
        prev_avg_consumption: prevBill?.prev_avg_consumption,
        prev_reading: prevBill?.prev_reading,
      };
    });

    return sendResponse({
      res,
      data: consumerWithBillData,
      msg: `Consumers for ${chkGroup} fetched successfully.`,
    });
  } catch (err) {
    console.error("Error fetching consumers by chk-group:", err);
    return sendErrorResponse({ res, err, msg: "Failed to fetch consumers." });
  }
};

















exports.chkGroupCombinations = async (req, res) => {
  try {
    // Fetch distinct chk, group values, and count consumers
    const consumerRecords = await ConsumerData.findAll({
      attributes: [
        "chk",
        "group",
        [db.Sequelize.fn("COUNT", db.Sequelize.col("id")), "consumerCount"],
      ],
      where: {
        chk: { [db.Sequelize.Op.not]: null },
        group: { [db.Sequelize.Op.not]: null },
      },
      group: ["chk", "group"], // Group by chk and group
      raw: true,
    });

    if (!consumerRecords.length) {
      return sendResponse({ res, data: [], msg: "No data found" });
    }

    // Organize data into chk-group combinations with consumer count
    const chkGroupMap = {};
    consumerRecords.forEach(({ chk, group, consumerCount }) => {
      if (!chkGroupMap[chk]) {
        chkGroupMap[chk] = [];
      }
      chkGroupMap[chk].push({ group, consumerCount });
    });

    // Format the response
    const formattedData = Object.entries(chkGroupMap).map(([chk, groups]) => ({
      chk,
      groups: groups.map(({ group, consumerCount }) => ({
        name: `${chk}-${group}`,
        consumerCount,
      })),
    }));

    return sendResponse({
      res,
      data: formattedData,
      msg: "Chk-Group combinations with consumer count fetched successfully",
    });
  } catch (err) {
    console.error("Error fetching chk-group data:", err);
    return sendErrorResponse({
      res,
      err,
      msg: "Failed to fetch chk-group combinations.",
    });
  }
};

// exports.consumersByChkGroup = async (req, res) => {
//     try {
//         console.log(req,"req data");

//       const { chkGroup, subdivision, division } = req?.params; // Expecting format like "57A-2"
//   console.log(chkGroup,"jssdjfjsdh");

//       if (!chkGroup || !chkGroup.includes("-")) {
//         return sendErrorResponse({
//           res,
//           msg: "Invalid chk-group format. Expected format: 'CHK-GRP' (e.g., '57A-2').",
//         });
//       }

//       // Extract chk and group from the input
//       const [chk, grup] = chkGroup.split("-");

//       // Fetch consumers matching the chk-group
//       const consumers = await ConsumerData.findAll({
//         where: {
//           chk: chk,
//           grup,
//           subdivision_number: subdivision,
//           division
//         },
//         raw: true, // Fetch plain objects
//       });

//       if (!consumers.length) {
//         return sendResponse({ res, data: [], msg: `No consumers found for ${chkGroup}.` });
//       }

//       return sendResponse({
//         res,
//         data: consumers,
//         msg: `Consumers for ${chkGroup} fetched successfully.`,
//       });
//     } catch (err) {
//       console.error("Error fetching consumers by chk-group:", err);
//       return sendErrorResponse({ res, err, msg: "Failed to fetch consumers." });
//     }
//   };


