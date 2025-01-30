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

//         // // Step 3: Fetch subcategories for validation
//         // const subcategories = await db.subcategories.findAll({where:{category_id: 1},
//         //     include: [
//         //         {
//         //             model: db.categories, // Include the associated Category data
//         //             as: 'category',  // Alias for the relation (if defined in model)
//         //             // attributes: ['id', 'category_name']  // Select the fields you want from the category
//         //         }
//         //     ]
//         // }); // Fetch all subcategories from the database
//         // console.log("subcategories ...!!!!!",subcategories);
//         // const subcategoryMap = {}; // Create a map for quick lookup
//         // subcategories.forEach((subcategory) => {
//         //     console.log("find category in subcategory",subcategory.category);
//         //     subcategoryMap[subcategory.category_id] = subcategory.id;
//         // });
// console.log("sheet data is here !!!!!!!!!!!",sheetData.Obj);

//         // Step 4: Extract and validate fields
//         const consumerRecords = sheetData.map((row) => {
//             console.log("sheetData of row data",row);
//             console.log("sheetData of row data cin number",row.CID);
//             console.log("sheetData of row data category",row.Category);
//             console.log("sheetData of row data METER_SIZE",row.METER_SIZE);
//             console.log("sheetData of row data METER_STTS",row.METER_STTS);
            
//             // const subcategoryId = subcategoryMap[row.Category_ID]; // Match subcategory by category_id
            
//             // if (!subcategoryId) {
//                 //     throw new Error(
//                     //         `Invalid category_id (${row.Category_ID}) or subcategory mapping not found in database.`
//                     //     );
//                     // }
                    
                    
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
//         // console.log(consumerRecords,"row data");
//         // Step 5: Save filtered records to the database
//         // const savedConsumers = await db.consumerData.bulkCreate(consumerRecords, {
//         //     validate: true, // Ensure validation is applied
//         // });

//         // console.log("savedConsumers is here :----->", savedConsumers);
//         res.status(200).json({
//             message: "Consumer data successfully saved!",
//             // savedConsumers,
//         });
//     } catch (err) {
//         console.error("Error:", err.message);
//         res.status(500).json({ message: err.message });
//     }
// }];

exports.create = [
    upload.single("file"),
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded!' });
            }

            const workbook = XLSX.readFile(req.file.path);
            const sheetName = workbook.SheetNames[0];
            const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

            if (sheetData.length === 0) {
                return res.status(400).json({ message: 'Uploaded Excel file is empty.' });
            }

            // Function to map category letters to IDs
            const mapCategoryID = (category) => {
                const categoryMapping = {
                    'D': 1,
                    'N': 2,
                    'I': 3,
                    'F': 4
                };
                return categoryMapping[category] || null;
            };
            // Function to map metersize letters to IDs
            const mapMeterSizeID = (metersize) => {
                const metersizeMapping = {
                    '0': null,
                    '15': 1,
                    '20': 2,
                    '25': 3,
                    '40': 4,
                    '50': 5,
                    '80': 6,
                    '100': 7,
                    '150': 8,
                    '1/2"': 1,
                    '3/4"': 2,
                    '1"':3,
                    '2"':5,
                    '3"': 6,
                    '4"': 7

                };
                return metersizeMapping[metersize] || null;
            };
            // Function to map category letters to IDs
            const mapMeterStatusID = (meterstatus) => {
                const meterstatusMapping = {
                    'MF': 1,
                    'MS': 2,
                    'DC': 3,
                    'SR': 4,
                    'DL': 5,
                    'NL': 6,
                    'NR': 7,
                    'WG': 8,
                    'DD': 9,
                    'DB': 10,
                    'NB': 11,
                    'FD': 12,
                    'BD': 13,
                    'KC': 14,
                    'NJ': 15,
                    'LS': 16,
                    'MT': 17,
                    'ST': 18,
                    //add fileds in db
                    'FR': 19,
                    'MC': 20,
                    'MD': 21,
                    'RC': 22,
                };
                return meterstatusMapping[meterstatus] || null;
            };

            const consumerRecords = sheetData.map(row => {
                if (!row.CID || !row.NAME || !row.CAT) {
                    throw new Error(`Missing required fields in row: ${JSON.stringify(row)}`);
                }


                return {
                    cin_number: row.CID,
                    name: row.NAME,
                    address1: row.ADD1 || null,
                    address2:  row.ADD2  || null,
                    address3: row.ADD3 || null,
                    mobile_number: row.MOBILE || null,
                    category_id: mapCategoryID(row.CAT),
                    connection_type_id: 1,
                    connection_size_id: mapMeterSizeID(row.METER_SIZE),
                    meter_status_id: mapMeterStatusID(row.CURR_STTS),
                    status: row.Status || 1,
                    division: row.DIV || null,
                    // sdo_id: row.SDO || null,
                    sdo_id: 3013026,
                    group: row.GRUP || null,
                    chk: row.CHK || null,
                    account_no: row.ACNT_NO || null,
                    // meter_size: row.METER_SIZE || null,
                    sewerage: row.CURR_SWTX ? true : false,
                    stp: true ,
                    rebate_off: row.REBT_OFF ? true : false,
                    service_no: row.SERV_NO,
                    meter_no: row.METER_NO,

                };
            });

            await ConsumersData.bulkCreate(consumerRecords, { validate: true });

            return res.status(200).json({ message: 'Consumer data successfully saved!' });
        } catch (err) {
            console.error('Error:', err.message);
            res.status(500).json({ message: err.message });
        }
    },
];


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
