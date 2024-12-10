const { validationResult } = require("express-validator");
const { Op, Sequelize } = require("sequelize");
// const con = require('./../../config/database');
const message = require('../utils/constant');
const { SELECT } = require("sequelize/lib/query-types");
const connectionSizeValidation = require('../utils/validation').connectionSizeValidation;
const { getPaginationAndSearch } = require('../utils/pagination');
const db = require("../models");
const ConnectionSize = db.connectionSizes;



exports.create = [
   ...connectionSizeValidation,
    async (req, res) => {
        try {
            // Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // console.log('errors', errors[msg])
                return res.status(400).json({
                    status: false,
                    // errors: errors.msg
                    errors: errors.array()
                });
            }

            // Proceed with the creation logic if validation passes
            const temp = {
                Connection_Size: req.body.Connection_Size,
            };

            let data = await ConnectionSize.create(temp, { new: true });

            return res.status(200).json({
                status: true,
                ConnectionSize: data,
                message: message.connectionSize_Added
            });
        } catch (error) {
            return res.status(500).json({
                message: message.Server_Error,
                status: false,
                error: error
            });
        }
    }
];

exports.update = [
    ...connectionSizeValidation,
    async (req, res) => {
        //         console.log('body name', req.body.name)
        //         console.log('PARAMS',req)
        //         console.log('Query ID',req.params.id)
    
        try {
             // Check for validation errors
            //  const errors = validationResult(req);
            //  if (!errors.isEmpty()) {
            //      // console.log('errors', errors[msg])
            //      return res.status(400).json({
            //          status: false,
            //          // errors: errors.msg
            //          errors: errors.array()
            //      });
            //  }
            const data = {
                Connection_Size: req?.body?.Connection_Size,
            };
            // console.log(req?.params?.id,'data', data)
            const connectionSize = await ConnectionSize.findByPk(req?.params?.id);
            // console.log('first', connectionSize)
            if (!connectionSize) {
                return res.status(404).json({
                    message: message.connectionSize_not_found,
                    status: false
                });
            }
            // Update the connectionSize with the new fields
            await connectionSize.update(data);
            const updatedConnectionSize = await ConnectionSize.findByPk(req?.params?.id);
            // console.log("connectionSize after update", updatedConnectionSize);
            return res.status(200).json({
                status: true,
                connectionSize: updatedConnectionSize,
                message: message.connectionSize_Updated,
            });
        } catch (error) {
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
        const connectionSize = await ConnectionSize.findByPk(req?.params?.id);
        if (!connectionSize) {
            return res.status(404).json({
                message: message.connectionSize_not_found,
                status: false
            });
        }
        const deleteData = await ConnectionSize.destroy({ where: {id: req?.params?.id} });
        return res.status(200).json({
            status: true,
            message: message. connectionSize_Deleted
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
        const connectionSize = await ConnectionSize.findByPk(req?.params?.id);
        // console.log('first', ConnectionSize)
        if (!connectionSize) {
            return res.status(404).json({
                message: message.connectionSize_not_found,
                status: false
            });
        }
        res.status(200).json({
            status: true,
            message: message.Data_get_successfully,
            data: connectionSize
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
        const { offset, perPage, whereCondition } = getPaginationAndSearch(req, 'Connection_Size');  // Pass the field for search

        // Fetch the connection size list with pagination and search filter
        let connectionSizeList = await ConnectionSize.findAndCountAll({
            offset: offset,
            limit: perPage,
            where: whereCondition,  // Apply search filter if exists
        });

        if (!connectionSizeList) {
            return res.status(404).json({
                status: false,
                message: message.Record_not_found,
            });
        }

        res.status(200).json({
            status: true,
            message: message.Data_get_successfully,
            ConnectionSize: connectionSizeList.rows,
            count: connectionSizeList.count,
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            error: error.message || message.Server_Error,
        });
    }
};
