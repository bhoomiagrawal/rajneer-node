const { Op, Sequelize } = require("sequelize");
// const con = require('./../../config/database');
const message = require('../utils/constant');
const { SELECT } = require("sequelize/lib/query-types");
const db = require("../models");
const Category = db.categories;
const Subcategory = db.subcategories;



// class Subcategory {
    exports.create = async (req, res) => {
        try {
            console.log('req', req.body)
            const data = await Categories.findAll({where: { category_code: 'd' }});
            console.log(data,"dataaaaaaaaaaaaaaaaaa")
            const category = await Categories.findOne({
                where: {
                    id: req?.body?.category_id,
                },
              });
              console.log('category', category)
            const temp = {
                category_id:req?.body?.category_id,
                name: req?.body?.name,
            }
            console.log('temp', temp)
            // let data = SubcategoryModel.create(temp, {new: true});
            // return res.status(200).json({
            //     status: true,
            //     message: message. Subcategory_Added
            // })
        } catch (error) {
            console.log(error,"error")
            return res.status(500).json({
                message: message.Server_Error,
                status: false,
                error: error
            })
        }
    }


    // controllers/subcategoryController.js

// Create Subcategory function
exports.createSubcategory = async (req, res) => {
  const { name, category_id } = req.body;
  try {
    // Check if the category exists
    console.log('Category', Category)
    const category = await Category.findByPk(category_id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Create a new subcategory
    const newSubcategory = await Subcategory.create({
      name,
      category_id, // Foreign key reference to Category
    });

    // Return success response with the created subcategory
    return res.status(201).json({
      message: 'Subcategory created successfully',
      subcategory: newSubcategory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'An error occurred while creating the subcategory',
      error: error.message,
    });
  }
};

    exports.getAll = async (req, res) => {
        console.log("hi this is display the all items",req)
        // try {
        //     let page = Number(req?.query?.page);
        //     let perPage = Number(req?.query?.perPage);
        //     let searchItem = req.query.searchItem;

        //     if(searchItem) {
        //         page = 0
        //     }
        //     if (page > 0) {
        //         page = page * perPage
        //     }
            
        //     let subcategoryList = await SubcategoryModel.findAndCountAll({
        //         offset: page,
        //         limit: perPage,
        //         where: {
        //             [Op.or]: [
        //                 {name: { [Op.like]: "%" + searchItem + "%" }},
        //                 {slug: { [Op.like]: "%" + searchItem + "%" }}
        //             ]
        //           }
                
        //     })
        //     if (!subcategoryList) {
        //         return res.status(404).json({
        //             status: false,
        //             message: message.Record_not_found
        //         });
        //     }
        //     res.status(200).json({
        //         status: true,
        //         category: subcategoryList,
        //         message: message.Data_get_successfully
        //     })
        // } catch (error) {
        //     res.status(400).json({
        //         status: false,
        //         error: error.mesage
        //     })
        // }
    }

    exports.update = async (req, res) => {
        console.log('req', req.body.name)
        // try {
        //     const temp = {
        //         name: req?.body?.name,
        //         slug: req?.body?.slug
        //     }
        //     let data = await SubcategoryModel.findOne({where: { id: req?.params?.id }});
        //     if (!data) {
        //         return res.status(404).json({
        //             message: message.This_user_not_found
        //         });
        //     }
        //     var condition = { where: { id: req?.params?.id }};
        //     const subcategory = await SubcategoryModel.update(temp, condition, {new: true});
        //         return res.status(200).json({
        //             status: true,
        //             message: message. Subcategory_Updated
        //         });
        // } catch (error) {
        //     return res.status(500).json({
        //         message: message.Server_Error,
        //         status: false,
        //         error: error
        //     });
        // }
    }

    exports.delete = async (req, res) => {
        // try{
        //     let data = await SubcategoryModel.findOne({ where: {id: req?.params?.id} });
        //     if (!data) {
        //         return res.status(404).json({
        //             status: false,
        //             message: message.This_user_not_found
        //         })
        //     }

        //     const deleteData = await SubcategoryModel.destroy({ where: {id: req?.params?.id} });
        //     return res.status(200).json({
        //         status: true,
        //         message: message. Subcategory_Deleted
        //     });
        // } catch (error) {
        //     return res.status(500).json({
        //         message: message.Server_Error,
        //         status: false,
        //         error: error
        //     })
        // }
    }
    // // Delete all Categories from the database.
    // deleteAll = (req, res) => {
    // SubcategoryModel.destroy({
    //   where: {},
    //   truncate: false
    // })
    //   .then(nums => {
    //     res.send({ message: `${nums} Subcategories were deleted successfully!` });
    //   })
    //   .catch(err => {
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occurred while removing all Subcategories."
    //     });
    //   });
    // };

    exports.getSingle = async (req, res) => {
        // try {
        //     const singleSubcategory = await SubcategoryModel.findOne({ where: {id: req?.params?.id}})
        //     if(!singleSubcategory) {
        //         return res.status(404).json({
        //             message: message.This_user_not_found,
        //             status: false
        //         })
        //     }
        //     res.status(200).json({
        //         status: true,
        //         message: message.Data_get_successfully,
        //         data: singleSubcategory
        //     })
        // } catch (error) {
        //     return res.status(500).json({
        //         status: false,
        //         message: message.Server_Error
        //     })
        // }
    }
// }

// module.exports = new Subcategory();