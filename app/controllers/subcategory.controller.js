const { validationResult } = require("express-validator");
const { Op, Sequelize, where } = require("sequelize");
// const con = require('./../../config/database');
const subcategoryValidation = require('../utils/validation').subcategoryValidation;
const message = require('../utils/constant');
const { getPaginationAndSearch } = require('../utils/pagination');
const { SELECT } = require("sequelize/lib/query-types");
const { sendResponse, sendErrorResponse } = require("../utils/lib");
const db = require("../models");
const Category = db.categories;
const Subcategory = db.subcategories;


exports.create = [
    // Use the imported validation middleware
    ...subcategoryValidation,
    async (req, res) => {
        try {
            // Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return sendErrorResponse({res, err:errors.array(), status:401})
            }
            // Check for category id exist or not
            const catData = await Category.findByPk(req.body.category_id);
            // console.log('req.body.category_id', req.body.category_id)
            if (!catData) {
                return sendErrorResponse({res, msg:"Category not found",status:400})
            }
            const temp = {
                category_id: req?.body?.category_id,
                subcategory_name: req?.body?.subcategory_name,
            }
            let data = await Subcategory.create(temp, { new: true });
            return sendResponse({res, data})
            // return res.status(200).json({
            //     status: true,
            //     subcategory: data,
            //     message: message.Subcategory_Added
            // })
        } catch (err) {
            return sendErrorResponse({res,err})
        }
    }
]

exports.update = [
    // ...subcategoryValidation,
    async (req, res) => {
        // Check for validation errors
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({
        //         status: false,
        //         errors: errors.array()
        //     });
        // }

        try {
            const catData = await Category.findByPk(req.body.category_id);
            if (!catData) {
                return sendErrorResponse(res, "Category not found", 401)
            }
            const data = {
                category_id: req?.body?.category_id,
                subcategory_name: req?.body?.subcategory_name,
            }
            const subcategory = await Subcategory.findByPk(req?.params?.id);
            if (!subcategory) {
                return res.status(404).json({
                    message: message.Subcategory_not_found,
                    status: false
                });
            }
            // Update the subcategory with the new fields
            await subcategory.update(data);

            const updatedSubcategory = await Subcategory.findOne({
                where: {
                    id: req?.params?.id
                },
                include: [
                    {
                        model: db.categories, // Include the associated Category data
                        as: 'category',  // Alias for the relation (if defined in model)
                        // attributes: ['id', 'category_name']  // Select the fields you want from the category
                    }
                ]
            }
            );
            // console.log("subcategory after update", updatedSubcategory);
            return sendResponse(res, updatedSubcategory)
            // return res.status(200).json({
            //     status: true,
            //     subcategory: updatedSubcategory,
            //     message: message.Subcategory_Updated,
            // });
        } catch (error) {
            // console.log('error', error)
            return sendErrorResponse(res,error,message.Server_Error,500)
        }
    }
]

exports.delete = async (req, res) => {
    try {
        const subcategory = await Subcategory.findByPk(req?.params?.id);
        if (!subcategory) {
            return res.status(404).json({
                message: message.Subcategory_not_found,
                status: false
            });
        }
        // const b4del= await Subcategory;
        // console.log('b4del', b4del)
        const deleteData = await Subcategory.destroy({ where: { id: req?.params?.id } });

        //         console.log('deleteData', deleteData)
        //         const afterdel= await Subcategory;
        // console.log('afterdel', afterdel)
        // Check if any row was deleted (deleteData will be the count of affected rows)
        // console.log('deleteData', deleteData)
        if (deleteData === 0) {
            console.log('first')
            return res.status(400).json({
                message: message.Subcategory_not_deleted,  // You can define this message in your constants
                status: false
            });
        }
        // If deletion was successful, return a success response
        return res.status(200).json({
            status: true,
            message: message.Subcategory_Deleted
        });
    } catch (error) {
        return sendErrorResponse(res,error,message.Server_Error,500)
    }
}

exports.getSingle = async (req, res) => {
    try {
        const subcategory = await Subcategory.findOne({
            where: {
                id: req?.params?.id
            },
            include: [
                {
                    model: db.categories, // Include the associated Category data
                    as: 'category',  // Alias for the relation (if defined in model)
                    // attributes: ['id', 'category_name']  // Select the fields you want from the category
                }
            ]
        }
        );
        // console.log('first', subcategory)
        if (!subcategory) {
            return res.status(404).json({
                message: message.Subcategory_not_found,
                status: false
            });
        }
        res.status(200).json({
            status: true,
            message: message.Data_get_successfully,
            data: subcategory
        })
    } catch (error) {
        // console.log(error)
        return sendErrorResponse(res,error,message.Server_Error,500)
    }
}

exports.getAll = async (req, res) => {
    try {
        // Use the helper to extract pagination and search information
        const { offset, perPage, whereCondition } = getPaginationAndSearch(req, 'subcategory_name');  // Pass the field for search

        // Fetch the subcategory list with pagination and search filter
        let subcategoryList = await Subcategory.findAndCountAll({
            offset: offset,
            limit: perPage,
            where: whereCondition,  // Apply search filter if exists
            include: [
                {
                    model: db.categories,  // Include the associated Category data
                    as: 'category',  // Alias for the relation
                }
            ]
        });

        // Check if data was found
        if (!subcategoryList.rows.length) {
            return sendErrorResponse({
                res,
                msg:message.Record_not_found,
                status:404
            })
        }

        // // Return the paginated data along with the category information
        // res.status(200).json({
        //     status: true,
        //     subCategory: subcategoryList,status:true,
        //     message: message.Data_get_successfully,
        // });
        // Return the modified response with status and message inside subCategory object
        return sendResponse({
            res, data:{
                subCategory: subcategoryList.rows,  // Rename rows to data
                count: subcategoryList.count   // Include the total count
            }
        })
        // res.status(200).json({
        //     // subCategory: {
        //     status: true,
        //     message: message.Data_get_successfully,
        //     subCategory: subcategoryList.rows,  // Rename rows to data
        //     count: subcategoryList.count   // Include the total count
        //     // }
        // });

    } catch (error) {
        // console.log('Error fetching subcategories: ', error);
        return sendErrorResponse(res,error,message.Server_Error,500)
    }
};
