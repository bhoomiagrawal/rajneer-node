const multer = require("multer");
const XLSX = require("xlsx");
const bodyParser = require("body-parser");
const db = require("../models");
const Category = db.categories;
const Subcategory = db.subcategories;
const ConnectionType = db.connectionType;
const ConnectionSize = db.connectionSize;
const meteStatusCode = db.meterStatus;
const ConsumersData = db.consumerData;

const { sendErrorResponse, sendResponse } = require("../utils/lib");

// Multer setup for file uploads
const upload = multer({ dest: "uploads/" });


exports.create = [upload.single("file"), async (req, res) => {
    try {
        // Step 1: Validate file presence
        console.log("file is here:-", req.file);
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded!" });
        }

        // Step 2: Read the uploaded Excel file
        const workbook = XLSX.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0]; // Get the first sheet
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]); // Convert sheet to JSON

        if (sheetData.length === 0) {
            return res.status(400).json({ message: "Uploaded Excel file is empty." });
        }

        // // Step 3: Fetch subcategories for validation
        // const subcategories = await db.subcategories.findAll({where:{category_id: 1},
        //     include: [
        //         {
        //             model: db.categories, // Include the associated Category data
        //             as: 'category',  // Alias for the relation (if defined in model)
        //             // attributes: ['id', 'category_name']  // Select the fields you want from the category
        //         }
        //     ]
        // }); // Fetch all subcategories from the database
        // console.log("subcategories ...!!!!!",subcategories);
        // const subcategoryMap = {}; // Create a map for quick lookup
        // subcategories.forEach((subcategory) => {
        //     console.log("find category in subcategory",subcategory.category);
        //     subcategoryMap[subcategory.category_id] = subcategory.id;
        // });
console.log("sheet data is here !!!!!!!!!!!",sheetData.Obj);

        // Step 4: Extract and validate fields
        const consumerRecords = sheetData.map((row) => {
            console.log("sheetData of row data",row);
            console.log("sheetData of row data cin number",row.CID);
            console.log("sheetData of row data category",row.Category);
            console.log("sheetData of row data METER_SIZE",row.METER_SIZE);
            console.log("sheetData of row data METER_STTS",row.METER_STTS);
            
            // const subcategoryId = subcategoryMap[row.Category_ID]; // Match subcategory by category_id
            
            // if (!subcategoryId) {
                //     throw new Error(
                    //         `Invalid category_id (${row.Category_ID}) or subcategory mapping not found in database.`
                    //     );
                    // }
                    
                    
            return {
                name: row.Name, // Ensure the Excel column matches
                cin_number: row.CIN_Number, // Map 'cin_number' column
                address: row.Address,
                mobile_number: row.Mobile_Number,
                category_id: row.Category_ID, // Foreign key for categories
                // subcategory_id: subcategoryId, // Valid subcategory_id
                conn_type_id: row.Connection_Type_ID,
                connection_size_id: row.Connection_Size_ID,
                meter_status_id: row.Meter_Status_ID,
                status: row.Status || 1, // Default to active if not specified
            };
        });
        // console.log(consumerRecords,"row data");
        // Step 5: Save filtered records to the database
        // const savedConsumers = await db.consumerData.bulkCreate(consumerRecords, {
        //     validate: true, // Ensure validation is applied
        // });

        // console.log("savedConsumers is here :----->", savedConsumers);
        res.status(200).json({
            message: "Consumer data successfully saved!",
            // savedConsumers,
        });
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({ message: err.message });
    }
}];



// 2nd no vala 
// exports.create = [upload.single("file"), async (req, res) => {
//     try {
//         // Step 1: Validate file presence
//         console.log("file is here:-", req.file);
//         if (!req.file) {
//             return res.status(400).json({ message: "No file uploaded!" });
//         }

//         // Step 2: Read the uploaded Excel file
//         const workbook = XLSX.readFile(req.file.path);
//         const sheetName = workbook.SheetNames[0]; // Get the first sheet
//         const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]); // Convert sheet to JSON

//         if (sheetData.length === 0) {
//             return res.status(400).json({ message: "Uploaded Excel file is empty." });
//         }

//         // Step 3: Fetch subcategories and connection types for validation
//         const [subcategories, connectionTypes] = await Promise.all([
//             db.subcategories.findAll(),
//             db.connectionType.findAll(), // Fetch connection types
//         ]);

//         const subcategoryMap = {}; // Create a map for quick lookup
//         subcategories.forEach((subcategory) => {
//             subcategoryMap[subcategory.category_id] = subcategory.id;
//         });

//         const connectionTypeMap = {}; // Create a map for quick lookup
//         connectionTypes.forEach((connType) => {
//             connectionTypeMap[connType.id] = connType.id;
//         });

//         // Step 4: Extract and validate fields
//         const consumerRecords = sheetData.map((row) => {
//             const subcategoryId = subcategoryMap[row.Category_ID]; // Match subcategory by category_id
//             const connectionTypeId = connectionTypeMap[row.Connection_Type_ID]; // Validate connection_type_id

//             // Validate subcategory
//             if (!subcategoryId) {
//                 throw new Error(
//                     `Invalid category_id (${row.Category_ID}) or subcategory mapping not found in database.`
//                 );
//             }

//             // Validate connection type
//             if (!connectionTypeId) {
//                 throw new Error(
//                     `Invalid conn_type_id (${row.Connection_Type_ID}) not found in connectionType table.`
//                 );
//             }

//             return {
//                 name: row.Name, // Ensure the Excel column matches
//                 cin_number: row.CIN_Number, // Map 'cin_number' column
//                 address: row.Address,
//                 mobile_number: row.Mobile_Number,
//                 category_id: row.Category_ID, // Foreign key for categories
//                 subcategory_id: subcategoryId, // Valid subcategory_id
//                 conn_type_id: connectionTypeId, // Valid connection_type_id
//                 connection_size_id: row.Connection_Size_ID,
//                 meter_status_id: row.Meter_Status_ID,
//                 status: row.Status || 1, // Default to active if not specified
//             };
//         });

//         // Step 5: Save filtered records to the database
//         const savedConsumers = await db.consumerData.bulkCreate(consumerRecords, {
//             validate: true, // Ensure validation is applied
//         });

//         console.log("savedConsumers is here :----->", savedConsumers);
//         res.status(200).json({
//             message: "Consumer data successfully saved!",
//             savedConsumers,
//         });
//     } catch (err) {
//         console.error("Error:", err.message);
//         res.status(500).json({ message: err.message });
//     }
// }];




// exports.create = [upload.single("file"), async (req, res) => {
//     try {
//         // Step 1: Validate file presence
//         console.log("file is here:-", req.file);
//         if (!req.file) {
//             return res.status(400).json({ message: "No file uploaded!" });
//         }

//         // Step 2: Read the uploaded Excel file
//         const workbook = XLSX.readFile(req.file.path);
//         const sheetName = workbook.SheetNames[0]; // Get the first sheet
//         const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]); // Convert sheet to JSON

//         if (sheetData.length === 0) {
//             return res.status(400).json({ message: "Uploaded Excel file is empty." });
//         }

// //         // Step 3: Fetch subcategories for validation
// //         const subcategories = await db.subcategories.findAll(); // Fetch all subcategories from the database
// //         const subcategoryMap = {}; // Create a map for quick lookup
// //         subcategories.forEach((subcategory) => {
// //             subcategoryMap[subcategory.category_id] = subcategory.id;
// //         });
// // console.log("subcategories:-" ,subcategories);
//         // Step 4: Extract and validate fields
//         const consumerRecords = sheetData.map((row) => {
//             // const subcategoryId = subcategoryMap[row.Category_ID]; // Match subcategory by category_id

//             // if (!subcategoryId) {
//             //     throw new Error(
//             //         `Invalid category_id (${row.Category_ID}) or subcategory mapping not found in database.`
//             //     );
//             // }

//             return {
//                 name: row.Name, // Ensure the Excel column matches
//                 cin_number: row.CIN_Number, // Map 'cin_number' column
//                 address: row.Address,
//                 mobile_number: row.Mobile_Number,
//                 category_id: row.Category_ID, // Foreign key for categories
//                 // subcategory_id: subcategoryId, // Valid subcategory_id
//                 conn_type_id: row.Connection_Type_ID,
//                 connection_size_id: row.Connection_Size_ID,
//                 meter_status_id: row.Meter_Status_ID,
//                 status: row.Status || 1, // Default to active if not specified
//             };
//         });

//         // Step 5: Save filtered records to the database
//         const savedConsumers = await db.consumerData.bulkCreate(consumerRecords, {
//             validate: true, // Ensure validation is applied
//         });

//         console.log("savedConsumers is here :----->", savedConsumers);
//         res.status(200).json({
//             message: "Consumer data successfully saved!",
//             savedConsumers,
//         });
//     } catch (err) {
//         console.error("Error:", err);
//         res.status(500).json({ message: err.message });
//     }
// }];
