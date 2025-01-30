const db = require("../models");
const ConsumerData = db.consumerData;
const { sendErrorResponse, sendResponse } = require("../utils/lib");

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


exports.consumersByChkGroup = async (req, res) => {
    try {
        console.log(req,"req data");
        
      const { chkGroup } = req?.params; // Expecting format like "57A-2"
  console.log(chkGroup,"jssdjfjsdh");
  
      if (!chkGroup || !chkGroup.includes("-")) {
        return sendErrorResponse({
          res,
          msg: "Invalid chk-group format. Expected format: 'CHK-GRP' (e.g., '57A-2').",
        });
      }
  
      // Extract chk and group from the input
      const [chk, group] = chkGroup.split("-");
  
      // Fetch consumers matching the chk-group
      const consumers = await ConsumerData.findAll({
        where: {
          chk: chk,
          group: group,
        },
        raw: true, // Fetch plain objects
      });
  
      if (!consumers.length) {
        return sendResponse({ res, data: [], msg: `No consumers found for ${chkGroup}.` });
      }
  
      return sendResponse({
        res,
        data: consumers,
        msg: `Consumers for ${chkGroup} fetched successfully.`,
      });
    } catch (err) {
      console.error("Error fetching consumers by chk-group:", err);
      return sendErrorResponse({ res, err, msg: "Failed to fetch consumers." });
    }
  };