const { validationResult } = require("express-validator");
const { Op, Sequelize, where } = require("sequelize");
// const con = require('./../../config/database');
const subcategoryValidation = require('../utils/validation').subcategoryValidation;
const message = require('../utils/constant');
const { getPaginationAndSearch } = require('../utils/pagination');
const { SELECT } = require("sequelize/lib/query-types");
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
                return res.status(400).json({
                    status: false,
                    errors: errors.array()
                });
            }
             const catData = await Category.findByPk(req.body.category_id);
             if (!catData) {
                 return res.status(404).json({ message: 'Category not found' });
             }
             const temp = {
                 category_id: req?.body?.category_id,
                 subcategory_name: req?.body?.subcategory_name,
             }
             let data = await Subcategory.create(temp, { new: true });
             return res.status(200).json({
                 status: true,
                 subcategory: data,
                 message: message.Subcategory_Added
             })
         } catch (error) {
            // console.log('error', error)
             return res.status(500).json({
                 message: message.Server_Error,
                 status: false,
                 error: error
             })
         }
     }
]

exports.update =[
    ...subcategoryValidation,
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: false,
                errors: errors.array()
            });
        }
   
       try {
            const catData = await Category.findByPk(req.body.category_id);
             if (!catData) {
                 return res.status(404).json({ message: 'Category not found' });
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
           const updatedSubcategory = await Subcategory.findByPk(req?.params?.id);
           // console.log("subcategory after update", updatedSubcategory);
           return res.status(200).json({
               status: true,
               subcategory: updatedSubcategory,
               message: message.Subcategory_Updated,
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
        const subcategory = await Subcategory.findByPk(req?.params?.id);
        if (!subcategory) {
            return res.status(404).json({
                message: message.Subcategory_not_found,
                status: false
            });
        }
        const deleteData = await Subcategory.destroy({ where: {id: req?.params?.id} });
        return res.status(200).json({
            status: true,
            message: message. Subcategory_Deleted
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
        const subcategory = await Subcategory.findOne({
            where:{
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
        return res.status(500).json({
            status: false,
            message: message.Server_Error
        })
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
            return res.status(404).json({
                status: false,
                message: message.Record_not_found,
            });
        }

        // // Return the paginated data along with the category information
        // res.status(200).json({
        //     status: true,
        //     subCategory: subcategoryList,status:true,
        //     message: message.Data_get_successfully,
        // });
         // Return the modified response with status and message inside subCategory object
         res.status(200).json({
            subCategory: {
                status: true,
                message: message.Data_get_successfully,
                data: subcategoryList.rows,  // Rename rows to data
                count: subcategoryList.count   // Include the total count
            }
        });

    } catch (error) {
        // console.log('Error fetching subcategories: ', error);
        res.status(500).json({
            status: false,
            error: error.message || message.Server_Error,
        });
    }
};
