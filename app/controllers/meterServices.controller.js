const { validationResult } = require("express-validator");
const { Op, Sequelize, where } = require("sequelize");
const message = require('../utils/constant');
const meterServiceChargeValidation = require('../utils/validation').meterServiceChargeValidation;
const {getPaginationAndSearch} = require('../utils/pagination')
const db = require("../models");
const { sendResponse, sendErrorResponse } = require("../utils/lib");
const ConnectionSize = db.connectionSize;
const MeterServiceCharge = db.meterServices;


exports.create = [
    // Use the imported validation middleware
    ...meterServiceChargeValidation,
    async (req, res) => {
        try {
            // Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return sendErrorResponse({res, err:errors.array(), status:401})
            }
            const connSizeData = await ConnectionSize.findByPk(req.body.connectionSize_id);
            if (!connSizeData) {
                return sendErrorResponse({res, msg:"Connection Size not found",status:400})
            }
            const temp = {
                connectionSize_id: req?.body?.connectionSize_id,
                meter_service_charge: req?.body?.meter_service_charge,
                status: req?.body?.status,
            }
            let data = await MeterServiceCharge.create(temp, { new: true });
            return sendResponse({res, data})
        } catch (err) {
            return sendErrorResponse({res,err})
        }
    }
]

exports.update = [
    // ...meterServiceChargeValidation,
    async (req, res) => {
        try {
            // Check for validation errors
            // const errors = validationResult(req);
            // if (!errors.isEmpty()) {
            // return sendErrorResponse({res, err:errors.array(), status:401})
            // }
            const id=req.params.id;
            const connectionSizeData = await ConnectionSize.findByPk(req?.body?.connectionSize_id);
            console.log('hi',req.body)
            if (!connectionSizeData) {
                return sendErrorResponse({res,msg: "Connection Size not found", status:404})
            }
            const data = {
                connectionSize_id: req?.body?.connectionSize_id,
                meter_service_charge: req?.body?.meter_service_charge,
                status: req?.body?.status,
            };
            const serviceCharge = await MeterServiceCharge.findByPk(id);
            if (!serviceCharge) {
                return sendErrorResponse({res,msg:message.meterServiceCharge_not_found,status:404})
            }
            // Update the subcategory with the new fields
            await serviceCharge.update(data);
            const updatedserviceCharge = await MeterServiceCharge.findOne({
                where:{id}, 
                include: [
                {
                    model: db.connectionSize,  // Include the associated Category data
                    as: 'connectionSize',  // Alias for the relation
                }
            ]});
            // const updatedserviceCharge = await MeterServiceCharge.findByPk(req?.params?.id);
            console.log("serviceCharge after update", updatedserviceCharge);
            return sendResponse({res,data: {meterServiceCharge: updatedserviceCharge}})
        } catch (err) {
            return sendErrorResponse({res,err})
        }
    }
]

exports.delete = async (req, res) => {
    try{
        const meterServiceCharge = await MeterServiceCharge.findByPk(req?.params?.id);
        if (!meterServiceCharge) {
            return sendErrorResponse({
                res,
                msg:message.meterServiceCharge_not_found,
                status:404
            })
        }
        const deleteData = await MeterServiceCharge.destroy({ where: {id: req?.params?.id} });
         // Check if any row was deleted (deleteData will be the count of affected rows)
         if (deleteData === 0) {
            return sendErrorResponse({
                res,
                msg: message.meterServiceCharge_not_deleted,
                status:404
            })
        }
        // If deletion was successful, return a success response
        return sendResponse({res,data:{message:message.meterServiceCharge_Deleted}});
    } catch (err) {
        return sendErrorResponse(res,err,message.Server_Error,500)
    }
}

exports.getSingle = async (req, res) => {
    try {
        // const meterServiceData = await MeterServiceCharge.findByPk(req?.params?.id);
        const meterServiceData = await MeterServiceCharge.findOne({
            where:{id:req?.params?.id}, 
            include: [
            {
                model: db.connectionSize,  // Include the associated Category data
                as: 'connectionSize',  // Alias for the relation
            }
        ]});
        // console.log('first', meterServiceData)
        if (!meterServiceData) {
            return sendErrorResponse({
                res, msg: message.meterServiceCharge_not_found,status:400
              })
        }
        return sendResponse({
            res, data: {meterServiceData,message:message.Data_get_successfully}
          })
    } catch (err) {
        return sendErrorResponse({res,err})
    }
}

exports.getAll = async (req, res) => {
    try {
        // Use the helper to extract pagination and search information for the specific field ('Connection_Size')
        const { offset, perPage, whereCondition } = getPaginationAndSearch(req, 'meter_service');  // Pass the field for search

        // Fetch the connection size list with pagination and search filter
        let meterServiceList = await MeterServiceCharge.findAndCountAll({
            offset,
            limit: perPage,
            where: whereCondition,  // Apply search filter if exists
            include: [
                {
                    model: db.connectionSize,  // Include the associated Category data
                    as: 'connectionSize',  // Alias for the relation
                }
            ]
        });

        // if (!meterServiceList) {
        //     return sendErrorResponse({
        //         res,
        //         msg:message.Record_not_found,
        //         status:404
        //     })
        // }
        // Return the modified response with status and message inside subCategory object
        return sendResponse({
            res, data:{
                meterService: meterServiceList.rows,  // Rename rows to data
                count: meterServiceList.count   // Include the total count
            }
        })
        res.status(200).json({
            status: true,
            message: message.Data_get_successfully,
            meterService: meterServiceList.rows,
            count: meterServiceList.count,
        })
    } catch (err) {
        return sendErrorResponse({res,err})
    }
};


