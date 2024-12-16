const { validationResult } = require("express-validator");
const { Op, Sequelize } = require("sequelize");
// const con = require('./../../config/database');
const message = require('../utils/constant');
const { SELECT } = require("sequelize/lib/query-types");
const {connectionTypeValidation} = require('../utils/validation');
const { getPaginationAndSearch } = require('../utils/pagination');
const { sendResponse, sendErrorResponse } = require("../utils/lib");
const db = require("../models");
const ConnectionType = db.connectionType;

exports.create = [
    // Use the imported validation middleware
    ...connectionTypeValidation,
    async (req, res) => {
        try {
            // Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return sendErrorResponse({res, err:errors.array(), status:401})            
            }
            // Proceed with the creation logic if validation passes
            const temp = {
                conn_type: req.body.conn_type,
                description: req.body.description,
                status: req.body.status,
            };
            let data = await ConnectionType.create(temp, { new: true });
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
                conn_type: req.body.conn_type,
                description: req.body.description,
                status: req.body.status,
            };
            const connectionTypeData = await ConnectionType.findByPk(id);
            if (!connectionTypeData) {
                return sendErrorResponse({res,msg:message.connectionType_not_found,status:404})
            }
            // Update the connectionSize with the new fields
            await connectionTypeData.update(data);
            const updatedconnectionType = await ConnectionType.findByPk(id);                         
            return sendResponse({res,data: {connectionType: updatedconnectionType,message: message.connectionType_Updated}})
        } catch (err) {
            console.log('err', err)
            return sendErrorResponse({res,err})
        }
    }
]

exports.delete = async (req, res) => {
    try{
        const connectionTypeData = await ConnectionType.findByPk(req?.params?.id);
        if (!connectionTypeData) {
            return sendErrorResponse({
                res,
                msg:message.connectionType_not_found,
                status:404
            })
        }
        const deleteData = await ConnectionType.destroy({ where: {id: req?.params?.id} });
         // Check if any row was deleted (deleteData will be the count of affected rows)
         if (deleteData === 0) {
            return sendErrorResponse({ res, msg: message.connectionType_not_deleted })
        }
        // If deletion was successful, return a success response
        return sendResponse({res,data:{message:message.connectionType_Deleted}});
    } catch (err) {
        return sendErrorResponse({res,err});
    }
}

exports.getSingle = async (req, res) => {
    try {
        const id= req.params.id;
        const connectionTypeData = await ConnectionType.findByPk(id);
        if (!connectionTypeData) {
            return sendErrorResponse({
                res, msg: message.connectionType_not_found,status:400
              })
        }
        return sendResponse({
            res, data: {connectionTypeData,message:message.Data_get_successfully}
          })
    } catch (err) {
        return sendErrorResponse({res,err})
    }
}

exports.getAll = async (req, res) => {
    try {
        // Use the helper to extract pagination and search information for the specific field ('Connection_Size')
        const { offset, perPage, whereCondition } = getPaginationAndSearch(req, 'conn_type');  // Pass the field for search
        // Fetch the connection size list with pagination and search filter
        let connectionTypeList = await ConnectionType.findAndCountAll({
            offset,
            limit: perPage,
            where: whereCondition,  // Apply search filter if exists
        });
        // if (!connectionTypeList) {
        //     return sendErrorResponse({
        //         res,
        //         msg:message.Record_not_found,
        //         status:404
        //     })
        // }
 // Return the modified response with status and message inside subCategory object
 return sendResponse({
    res, data:{
        connectionType: connectionTypeList.rows,  // Rename rows to data
        count: connectionTypeList.count  // Include the total count
    }
})        
    } catch (err) {
       return sendErrorResponse({res,err})
    }
};