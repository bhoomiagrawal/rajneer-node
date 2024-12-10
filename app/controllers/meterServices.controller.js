const { validationResult } = require("express-validator");
const { Op, Sequelize, where } = require("sequelize");
const message = require('../utils/constant');
const meterServiceChargeValidation = require('../utils/validation').meterServiceChargeValidation;
const {getPaginationAndSearch} = require('../utils/pagination')
const db = require("../models");
const ConnectionSize = db.connectionSizes;
const MeterServiceCharge = db.meterServices;


exports.create = [
    ...meterServiceChargeValidation,
    async (req, res) => {
        try {
            // Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    status: false,
                    errors: errors.array()
                });
            }
            const connSizeData = await ConnectionSize.findByPk(req.body.connectionSize_id);
            if (!connSizeData) {
                return res.status(404).json({ message: 'Connection Size not found' });
            }
            const temp = {
                connectionSize_id: req?.body?.connectionSize_id,
                meter_service: req?.body?.meter_service,
                status: req?.body?.status,
            }
            let data = await MeterServiceCharge.create(temp, { new: true });
            // console.log('data', data)
            return res.status(200).json({
                status: true,
                meterServiceCharge: data,
                message: message.meterServiceCharge_Added
            })
        } catch (error) {
            console.log('error', error)
            return res.status(500).json({
                message: message.Server_Error,
                status: false,
                error: error
            })
        }
    }
]

exports.update = [
    ...meterServiceChargeValidation,
    async (req, res) => {
        //         console.log('body name', req.body.name)
        //         console.log('PARAMS',req)
        //         console.log('Query ID',req.params.id)
    
        try {
            // Check for validation errors
            // const errors = validationResult(req);
            // if (!errors.isEmpty()) {
            //     return res.status(400).json({
            //         status: false,
            //         errors: errors.array()
            //     });
            // }
            const data = {
                connectionSize_id: req?.body?.connectionSize_id,
                meter_service: req?.body?.meter_service,
                status: req?.body?.status,
            };
            const serviceCharge = await MeterServiceCharge.findByPk(req?.params?.id);
            if (!serviceCharge) {
                return res.status(404).json({
                    message: message.meterServiceCharge_not_found,
                    status: false
                });
            }
            // Update the subcategory with the new fields
            await serviceCharge.update(data);
            const updatedserviceCharge = await MeterServiceCharge.findOne({
                where:{id:req?.params?.id}, 
                include: [
                {
                    model: db.connectionSizes,  // Include the associated Category data
                    as: 'connectionSizes',  // Alias for the relation
                }
            ]});
            // const updatedserviceCharge = await MeterServiceCharge.findByPk(req?.params?.id);
            console.log("serviceCharge after update", updatedserviceCharge);
            return res.status(200).json({
                status: true,
                serviceCharge: updatedserviceCharge,
                message: message.meterServiceCharge_Updated,
            });
        } catch (error) {
            console.log('error', error)
            return res.status(500).json({
                message: message.Server_Error,
                status: false,
                error: error
            });
        }
    }
]

exports.delete = async (req, res) => {
    try{
        const meterServiceCharge = await MeterServiceCharge.findByPk(req?.params?.id);
        if (!meterServiceCharge) {
            return res.status(404).json({
                message: message.meterServiceCharge_not_found,
                status: false
            });
        }
        const deleteData = await MeterServiceCharge.destroy({ where: {id: req?.params?.id} });
        return res.status(200).json({
            status: true,
            message: message. meterServiceCharge_Deleted
        });
    } catch (error) {
        return res.status(500).json({
            message: message.Server_Error,
            status: false,
            error: error
        })
    }
}

exports.getSingle = async (req, res) => {
    try {
        // const meterServiceData = await MeterServiceCharge.findByPk(req?.params?.id);
        const meterServiceData = await MeterServiceCharge.findOne({
            where:{id:req?.params?.id}, 
            include: [
            {
                model: db.connectionSizes,  // Include the associated Category data
                as: 'connectionSizes',  // Alias for the relation
            }
        ]});
        // console.log('first', meterServiceData)
        if (!meterServiceData) {
            return res.status(404).json({
                message: message.meterServiceCharge_not_found,
                status: false
            });
        }
        res.status(200).json({
            status: true,
            message: message.Data_get_successfully,
            data: meterServiceData
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: message.Server_Error
        })
    }
}

exports.getAll = async (req, res) => {
    try {
        // Use the helper to extract pagination and search information for the specific field ('Connection_Size')
        const { offset, perPage, whereCondition } = getPaginationAndSearch(req, 'meter_service');  // Pass the field for search

        // Fetch the connection size list with pagination and search filter
        let meterServiceList = await MeterServiceCharge.findAndCountAll({
            offset: offset,
            limit: perPage,
            where: whereCondition,  // Apply search filter if exists
            include: [
                {
                    model: db.connectionSizes,  // Include the associated Category data
                    as: 'connectionSizes',  // Alias for the relation
                }
            ]
        });

        if (!meterServiceList) {
            return res.status(404).json({
                status: false,
                message: message.Record_not_found
            });
        }
        res.status(200).json({
            status: true,
            message: message.Data_get_successfully,
            meterService: meterServiceList.rows,
            count: meterServiceList.count,
        })
    } catch (error) {
        console.log('error', error)
        res.status(400).json({
            status: false,
            error: error.mesage
        })
    }
};


