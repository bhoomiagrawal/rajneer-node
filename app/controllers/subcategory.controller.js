const { validationResult } = require("express-validator");
const { Op, Sequelize, where } = require("sequelize");
// const con = require('./../../config/database');
const subcategoryValidation = require('../utils/validation').subcategoryValidation;
const message = require('../utils/constant');
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

// exports.getAll = async (req, res) => {
//     try {
//         let page = Number(req?.query?.page) || 0;  // Default to 0 if not provided
//         let perPage = Number(req?.query?.perPage) || 10;  // Default to 10 if not provided
//         let searchItem = req.query.searchItem;

//         // If searchItem is provided, reset page to 0 for a fresh search
//         if (searchItem) {
//             page = 0;
//         }

//         // Adjust page offset based on pagination
//         let offset = page > 0 ? page * perPage : 0;

//         // Fetch subcategory data with category information
//         let subcategoryList = await Subcategory.findAndCountAll({
//             offset: offset,
//             limit: perPage,
//             where: {
//                 [Op.or]: [
//                     { subcategory_name: { [Op.like]: "%" + searchItem + "%" } },
//                     // Uncomment if you want to search by slug as well
//                     // { slug: { [Op.like]: "%" + searchItem + "%" } }
//                 ]
//             },
//             include: [
//                 {
//                     model: db.categories, // Include the associated Category data
//                     as: 'categories',  // Alias for the relation (if defined in model)
//                     attributes: ['id', 'category_name']  // Select the fields you want from the category
//                 }
//             ]
//         });

//         // Check if data was found
//         if (!subcategoryList.rows.length) {
//             return res.status(404).json({
//                 status: false,
//                 message: message.Record_not_found
//             });
//         }

//         // Return the paginated data along with the category information
//         res.status(200).json({
//             status: true,
//             subCategory: subcategoryList,
//             message: message.Data_get_successfully
//         });

//     } catch (error) {
//         console.log('Error fetching subcategories: ', error);
//         res.status(500).json({
//             status: false,
//             error: error.message || message.Server_Error
//         });
//     }
// };

exports.getAll = async (req, res) => {
    // console.log("hi this is display the all items", req?.query?.page)
    try {
        let page = Number(req?.query?.page);
        let perPage = Number(req?.query?.perPage);
        let searchItem = req.query.searchItem;

        if (searchItem) {
            page = 0
        }
        if (page > 0) {
            page = page * perPage
        }

        let subcategoryList = await Subcategory.findAndCountAll({
            offset: page,
            limit: perPage,
            where: {
                [Op.or]: [
                    { subcategory_name: { [Op.like]: "%" + searchItem + "%" } },
                    // {slug: { [Op.like]: "%" + searchItem + "%" }}
                ]
            }

        })
        // console.log('subcategoryList', subcategoryList)
        if (!subcategoryList) {
            return res.status(404).json({
                status: false,
                message: message.Record_not_found
            });
        }
        res.status(200).json({
            status: true,
            subCategory: subcategoryList,
            message: message.Data_get_successfully
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            error: error.mesage
        })
    }
}

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


        //    const data = {
        //        subcategory_name: req?.body?.subcategory_name,
        //    };
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
        const subcategory = await Subcategory.findByPk(req?.params?.id);
        console.log('first', subcategory)
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
        return res.status(500).json({
            status: false,
            message: message.Server_Error
        })
    }
}
