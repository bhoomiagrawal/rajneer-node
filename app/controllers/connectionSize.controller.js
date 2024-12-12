const { validationResult } = require("express-validator");
const { Op, Sequelize } = require("sequelize");
// const con = require('./../../config/database');
const message = require('../utils/constant');
const { SELECT } = require("sequelize/lib/query-types");
const connectionSizeValidation = require('../utils/validation').connectionSizeValidation;
const { getPaginationAndSearch } = require('../utils/pagination');
const { sendResponse, sendErrorResponse } = require("../utils/lib");
const db = require("../models");
const ConnectionSize = db.connectionSize;



exports.create = [
    // Use the imported validation middleware
   ...connectionSizeValidation,
    async (req, res) => {
        try {
            // Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return sendErrorResponse({res, err:errors.array(), status:401})            
            }
            // Proceed with the creation logic if validation passes
            const temp = {
                size: req.body.size,
            };
            let data = await ConnectionSize.create(temp, { new: true });
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
                size: req?.body?.size,
            };
            const connectionSize = await ConnectionSize.findByPk(id);
            if (!connectionSize) {
                return sendErrorResponse({res,msg:message.connectionSize_not_found,status:404})
            }
            // Update the connectionSize with the new fields
            await connectionSize.update(data);
            const updatedConnectionSize = await ConnectionSize.findByPk(id);           
            return sendResponse({res,data: {connectionSize: updatedConnectionSize,message:message.connectionSize_Updated}})
        } catch (err) {
            return sendErrorResponse({res,err})
        }
    }
]

exports.delete = async (req, res) => {
    try{
        const connectionSize = await ConnectionSize.findByPk(req?.params?.id);
        if (!connectionSize) {
            return sendErrorResponse({
                res,
                msg:message.connectionSize_not_found,
                status:404
            })
        }
        const deleteData = await ConnectionSize.destroy({ where: {id: req?.params?.id} });
         // Check if any row was deleted (deleteData will be the count of affected rows)
         if (deleteData === 0) {
            return sendErrorResponse({ res, msg: message.connectionSize_not_deleted })
        }
        // If deletion was successful, return a success response
        return sendResponse({res,data:{message:message.connectionSize_Deleted}});
    } catch (err) {
        return sendErrorResponse({res,err});
    }
}

exports.getSingle = async (req, res) => {
    try {
        const id= req.params.id;
        const connectionSize = await ConnectionSize.findByPk(id);
        if (!connectionSize) {
            return sendErrorResponse({
                res, msg: message.connectionSize_not_found,status:400
              })
        }
        return sendResponse({
            res, data: {connectionSize,message:message.Data_get_successfully}
          })
    } catch (err) {
        return sendErrorResponse({res,err})
    }
}

exports.getAll = async (req, res) => {
    try {
        // Use the helper to extract pagination and search information for the specific field ('Connection_Size')
        const { offset, perPage, whereCondition } = getPaginationAndSearch(req, 'size');  // Pass the field for search
        // Fetch the connection size list with pagination and search filter
        let connectionSizeList = await ConnectionSize.findAndCountAll({
            offset,
            limit: perPage,
            where: whereCondition,  // Apply search filter if exists
        });
        if (!connectionSizeList) {
            return sendErrorResponse({
                res,
                msg:message.Record_not_found,
                status:404
            })
        }
 // Return the modified response with status and message inside subCategory object
 return sendResponse({
    res, data:{
        connectionSize: connectionSizeList.rows,  // Rename rows to data
        count: connectionSizeList.count  // Include the total count
    }
})        
    } catch (err) {
       return sendErrorResponse({res,err})
    }
};
