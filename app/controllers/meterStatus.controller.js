const { validationResult } = require("express-validator");
const { Op, Sequelize } = require("sequelize");
// const con = require('./../../config/database');
const message = require('../utils/constant');
const { SELECT } = require("sequelize/lib/query-types");
const meterStatusValidation = require('../utils/validation').meterStatusValidation;
const { getPaginationAndSearch } = require('../utils/pagination');
const { sendResponse, sendErrorResponse } = require("../utils/lib");
const db = require("../models");
const meteStatusCode = db.meterStatus;

exports.create = [
    // Use the imported validation middleware
    ...meterStatusValidation,
    async (req, res) => {
        try {
            // Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return sendErrorResponse({res, err:errors.array(), status:401})            
            }
            // Proceed with the creation logic if validation passes
            const temp = {
                meter_status: req.body.meter_status,
                // rule: req.body.rule,
                description: req.body.description,
                status: req.body.status,
            };
            let data = await meteStatusCode.create(temp, { new: true });
            return sendResponse({res, data})  
        } catch (err) {
           return sendErrorResponse({res,err})
        }
    }
];

exports.update = [
    // ...connectionSizeValidation,
    async (req, res) => {   
        try {
            // Check for validation errors
            //  const errors = validationResult(req);
            //  if (!errors.isEmpty()) {
            //      return sendErrorResponse({res, err:errors.array(), status:401})
            //  }
            const id = req.params.id;
            const data = {
                meter_status: req?.body?.meter_status,
                // rule: req?.body?.rule,
                description: req?.body?.description,
                status: req?.body?.status,
            };
            const meterStatus = await meteStatusCode.findByPk(id);
            if (!meterStatus) {
                return sendErrorResponse({res,msg:message.meterStatusCode_not_found,status:404})
            }
            // Update the connectionSize with the new fields
            await meterStatus.update(data);
            const updatedmeterStatus = await meteStatusCode.findByPk(id);                         
            return sendResponse({res,data: {meterStatus: updatedmeterStatus,message: message.meterStatusCode_Updated}})
        } catch (err) {
            return sendErrorResponse({res,err})
        }
    }
]

exports.delete = async (req, res) => {
    try{
        const meterStatus = await meteStatusCode.findByPk(req?.params?.id);
        if (!meterStatus) {
            return sendErrorResponse({
                res,
                msg:message.meterStatusCode_not_found,
                status:404
            })
        }
        const deleteData = await meteStatusCode.destroy({ where: {id: req?.params?.id} });
         // Check if any row was deleted (deleteData will be the count of affected rows)
         if (deleteData === 0) {
            return sendErrorResponse({ res, msg: message.meterStatusCode_not_deleted })
        }
        // If deletion was successful, return a success response
        return sendResponse({res,data:{message:message.meterStatusCode_Deleted}});
    } catch (err) {
        return sendErrorResponse({res,err});
    }
}

exports.getSingle = async (req, res) => {
    try {
        const id= req.params.id;
        const meterStatus = await meteStatusCode.findByPk(id);
        if (!meterStatus) {
            return sendErrorResponse({
                res, msg: message.meterStatusCode_not_found,status:400
              })
        }
        return sendResponse({
            res, data: {meterStatus,message:message.Data_get_successfully}
          })
    } catch (err) {
        return sendErrorResponse({res,err})
    }
}


exports.getAll = async (req, res) => {
    try {
        // Fetch all meter status codes without pagination or search filters
        const meteStatusCodeList = await meteStatusCode.findAll();

        // Return the response with the retrieved data
        return sendResponse({
            res,
            data: {
                meteStatusCode: meteStatusCodeList,  // All records
                count: meteStatusCodeList.length,    // Total count of records
            }
        });
    } catch (err) {
        return sendErrorResponse({ res, err });
    }
};



// exports.getAll = async (req, res) => {
//     try {
//         // Use the helper to extract pagination and search information for the specific field ('Connection_Size')
//         const { offset, perPage, whereCondition } = getPaginationAndSearch(req, 'meter_status');  // Pass the field for search
//         // Fetch the connection size list with pagination and search filter
//         let meteStatusCodeList = await meteStatusCode.findAndCountAll({
//             offset,
//             limit: perPage,
//             where: whereCondition,  // Apply search filter if exists
//         });
//         const totalPages = meteStatusCodeList.count > 0 ? Math.ceil(meteStatusCodeList.count / perPage) : 0;
//         // if (!meteStatusCodeList) {
//         //     return sendErrorResponse({
//         //         res,
//         //         msg:message.Record_not_found,
//         //         status:404
//         //     })
//         // }
//  // Return the modified response with status and message inside subCategory object
//  return sendResponse({
//     res, 
//     // data:{
//     //     meteStatusCode: meteStatusCodeList.rows,  // Rename rows to data
//     //     count: meteStatusCodeList.count  // Include the total count
//     // }
//     data: {
//         meteStatusCode: meteStatusCodeList.rows,  // Rename rows to subCategory data
//         count: meteStatusCodeList.count,   // Include the total count for pagination
//         totalPages: totalPages, // Calculate total pages
//         currentPage: req.query.page || 1, // Current page based on the request
//         pageSize: perPage, // Number of items per page
//     }
// })        
//     } catch (err) {
//        return sendErrorResponse({res,err})
//     }
// };