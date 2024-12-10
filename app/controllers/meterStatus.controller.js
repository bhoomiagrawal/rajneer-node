const { validationResult } = require("express-validator");
const { Op, Sequelize } = require("sequelize");
// const con = require('./../../config/database');
const message = require('../utils/constant');
const { SELECT } = require("sequelize/lib/query-types");
const meterStatusValidation = require('../utils/validation').meterStatusValidation;
const { getPaginationAndSearch } = require('../utils/pagination');
const db = require("../models");
const meteStatusCode = db.meterStatus;

exports.create = [
    ...meterStatusValidation,
    async (req, res) => {
        try {
            console.log('try')
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
                meter_status: req.body.meter_status,
                rule: req.body.rule,
                description: req.body.description,
                status: req.body.status,
            };

            let data = await meteStatusCode.create(temp, { new: true });

            return res.status(200).json({
                status: true,
                meterStatusCode: data,
                message: message.meterStatusCode_Added
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
];

exports.update = [
    // ...meterStatusValidation,
    async (req, res) => {
        //         console.log('body name', req.body.name)
        //         console.log('PARAMS',req)
        //         console.log('Query ID',req.params.id)

        try {
            // Check for validation errors
            // const errors = validationResult(req);
            // if (!errors.isEmpty()) {
            //     // console.log('errors', errors[msg])
            //     return res.status(400).json({
            //         status: false,
            //         // errors: errors.msg
            //         errors: errors.array()
            //     });
            // }
            const data = {
                meter_status: req?.body?.meter_status,
                rule: req?.body?.rule,
                description: req?.body?.description,
                status: req?.body?.status,
            };
            console.log(req?.params?.id,'data', data)
            // console.log(req?.params?.id,'data', data)
            const meterStatus = await meteStatusCode.findByPk(req?.params?.id);
            // console.log('first', connectionSize)
            if (!meterStatus) {
                return res.status(404).json({
                    message: message.meterStatus_not_found,
                    status: false
                });
            }
            // Update the meterStatus with the new fields
            await meterStatus.update(data);
            const updatedmeterStatus = await meteStatusCode.findByPk(req?.params?.id);
            // console.log("meterStatus after update", updatedmeterStatus);
            return res.status(200).json({
                status: true,
                meterStatus: updatedmeterStatus,
                message: message.meterStatusCode_Updated,
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

// exports.delete = async (req, res) => {
//     try {
//         const connectionSize = await ConnectionSize.findByPk(req?.params?.id);
//         if (!connectionSize) {
//             return res.status(404).json({
//                 message: message.connectionSize_not_found,
//                 status: false
//             });
//         }
//         const deleteData = await ConnectionSize.destroy({ where: { id: req?.params?.id } });
//         return res.status(200).json({
//             status: true,
//             message: message.connectionSize_Deleted
//         });
//     } catch (error) {
//         return res.status(500).json({
//             message: message.Server_Error,
//             status: false,
//             error: error
//         })
//     }
// }

// exports.getSingle = async (req, res) => {
//     try {
//         const connectionSize = await ConnectionSize.findByPk(req?.params?.id);
//         // console.log('first', ConnectionSize)
//         if (!connectionSize) {
//             return res.status(404).json({
//                 message: message.connectionSize_not_found,
//                 status: false
//             });
//         }
//         res.status(200).json({
//             status: true,
//             message: message.Data_get_successfully,
//             data: connectionSize
//         })
//     } catch (error) {
//         return res.status(500).json({
//             status: false,
//             message: message.Server_Error
//         })
//     }
// }

// exports.getAll = async (req, res) => {
//     try {
//         // Use the helper to extract pagination and search information for the specific field ('Connection_Size')
//         const { offset, perPage, whereCondition } = getPaginationAndSearch(req, 'Connection_Size');  // Pass the field for search

//         // Fetch the connection size list with pagination and search filter
//         let connectionSizeList = await ConnectionSize.findAndCountAll({
//             offset: offset,
//             limit: perPage,
//             where: whereCondition,  // Apply search filter if exists
//         });

//         if (!connectionSizeList) {
//             return res.status(404).json({
//                 status: false,
//                 message: message.Record_not_found,
//             });
//         }
//         // Return the modified response with status and message inside subCategory object
//         res.status(200).json({
//             status: true,
//             message: message.Data_get_successfully,
//             ConnectionSize: connectionSizeList.rows,
//             count: connectionSizeList.count
//         });
//     } catch (error) {
//         res.status(400).json({
//             status: false,
//             error: error.message || message.Server_Error,
//         });
//     }
// };



// class Consumption {
//     create = async (req, res) => {
//         try {
//             console.log('req', req.body)
//             // const temp = {
//             //     category_id:req?.body?.category_id,
//             //     name: req?.body?.name,
//             // }
//             // console.log('temp', temp)
//             // let data = consumptionRule.create(temp, {new: true});
//             // return res.status(200).json({
//             //     status: true,
//             //     message: message. Subcategory_Added
//             // })
//         } catch (error) {
//             console.log(error,"error")
//             return res.status(500).json({
//                 message: message.Server_Error,
//                 status: false,
//                 error: error
//             })
//         }
//     }

//     getAll = async (req, res) => {
//         console.log("hi this is display the all items",req)
//         // try {
//         //     let page = Number(req?.query?.page);
//         //     let perPage = Number(req?.query?.perPage);
//         //     let searchItem = req.query.searchItem;

//         //     if(searchItem) {
//         //         page = 0
//         //     }
//         //     if (page > 0) {
//         //         page = page * perPage
//         //     }
            
//         //     let subcategoryList = await consumptionRule.findAndCountAll({
//         //         offset: page,
//         //         limit: perPage,
//         //         where: {
//         //             [Op.or]: [
//         //                 {name: { [Op.like]: "%" + searchItem + "%" }},
//         //                 {slug: { [Op.like]: "%" + searchItem + "%" }}
//         //             ]
//         //           }
                
//         //     })
//         //     if (!ConsumptionRuleList) {
//         //         return res.status(404).json({
//         //             status: false,
//         //             message: message.Record_not_found
//         //         });
//         //     }
//         //     res.status(200).json({
//         //         status: true,
//         //         category: ConsumptionRuleList,
//         //         message: message.Data_get_successfully
//         //     })
//         // } catch (error) {
//         //     res.status(400).json({
//         //         status: false,
//         //         error: error.mesage
//         //     })
//         // }
//     }

//     update = async (req, res) => {
//         console.log('req', req.body.name)
//         // try {
//         //     const temp = {
//         //         name: req?.body?.name,
//         //         slug: req?.body?.slug
//         //     }
//         //     let data = await consumptionRule.findOne({where: { id: req?.params?.id }});
//         //     if (!data) {
//         //         return res.status(404).json({
//         //             message: message.This_user_not_found
//         //         });
//         //     }
//         //     var condition = { where: { id: req?.params?.id }};
//         //     const consumption = await consumptionRule.update(temp, condition, {new: true});
//         //         return res.status(200).json({
//         //             status: true,
//         //             message: message. consumption_Updated
//         //         });
//         // } catch (error) {
//         //     return res.status(500).json({
//         //         message: message.Server_Error,
//         //         status: false,
//         //         error: error
//         //     });
//         // }
//     }

//     delete = async (req, res) => {
//         // try{
//         //     let data = await consumptionRule.findOne({ where: {id: req?.params?.id} });
//         //     if (!data) {
//         //         return res.status(404).json({
//         //             status: false,
//         //             message: message.This_user_not_found
//         //         })
//         //     }

//         //     const deleteData = await consumptionRule.destroy({ where: {id: req?.params?.id} });
//         //     return res.status(200).json({
//         //         status: true,
//         //         message: message. ConsumptionRule_Deleted
//         //     });
//         // } catch (error) {
//         //     return res.status(500).json({
//         //         message: message.Server_Error,
//         //         status: false,
//         //         error: error
//         //     })
//         // }
//     }
//     // // Delete all Categories from the database.
//     // deleteAll = (req, res) => {
//     // consumptionRule.destroy({
//     //   where: {},
//     //   truncate: false
//     // })
//     //   .then(nums => {
//     //     res.send({ message: `${nums} Subcategories were deleted successfully!` });
//     //   })
//     //   .catch(err => {
//     //     res.status(500).send({
//     //       message:
//     //         err.message || "Some error occurred while removing all Subcategories."
//     //     });
//     //   });
//     // };

//     getSingle = async (req, res) => {
//         // try {
//         //     const singleConsumption = await consumptionRule.findOne({ where: {id: req?.params?.id}})
//         //     if(!singleConsumption) {
//         //         return res.status(404).json({
//         //             message: message.This_user_not_found,
//         //             status: false
//         //         })
//         //     }
//         //     res.status(200).json({
//         //         status: true,
//         //         message: message.Data_get_successfully,
//         //         data: singleConsumption
//         //     })
//         // } catch (error) {
//         //     return res.status(500).json({
//         //         status: false,
//         //         message: message.Server_Error
//         //     })
//         // }
//     }
// }

// module.exports = new Consumption();