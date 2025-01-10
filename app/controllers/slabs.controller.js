
const { validationResult } = require("express-validator");
const { Op, Sequelize, where } = require("sequelize");
// const con = require('./../../config/database');
const { slabValidation } = require('../utils/validation');
const message = require('../utils/constant');
const { getPaginationAndSearch } = require('../utils/pagination');
const { SELECT } = require("sequelize/lib/query-types");
const { sendResponse, sendErrorResponse } = require("../utils/lib");
const db = require("../models");
const Slab = db.slabs;
const Category = db.categories;



exports.create = [
  // Use the imported validation middleware
  ...slabValidation,
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return sendErrorResponse({ res, err: errors.array(), status: 401 })
      }
      const { max_consumption, min_consumption, category_id } = req.body

      // Check for category id exist or not
      // const catData = await Category.findByPk(category_id);
      // if (!catData) {
      //   return sendErrorResponse({ res, msg: "Category not found", status: 400 })
      // }


      let data = await Slab.create({ max_consumption, min_consumption, category_id }, { new: true });
      return sendResponse({ res, data })
    } catch (err) {
      return sendErrorResponse({ res, err })
    }
  }
]
// Retrieve all Slabs from the database.
exports.getAll = async (req, res) => {
  try {
      // Use the helper to extract pagination and search information
      const { offset, perPage, whereCondition } = getPaginationAndSearch(req, 'slab_name');  // Pass the field for search

      // Fetch the subcategory list with pagination and search filter
      let slabList = await Slab.findAndCountAll({
          offset,
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
      if (!slabList.rows.length) {
          return sendErrorResponse({
              res,
              msg:message.Record_not_found,
              status:404
          })
      }
      // Return the modified response with status and message inside subCategory object
      return sendResponse({
          res, data:{
              slab: slabList.rows,  // Rename rows to data
              count: slabList.count   // Include the total count
          }
      })
  } catch (err) {
      // console.log('Error fetching subcategories: ', error);
      return sendErrorResponse({res,err})
  }
};
// Find a single Slab with an id
exports.getSingle = async (req, res) => {
  try {
    const { id } = req.params
    const slab = await Slab.findOne({
      where: {
        id
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
    if (!slab) {
      return sendErrorResponse({
        res, msg: message.Slab_not_found, status: 400
      })
    }
    return sendResponse({
      res, data: { slab }
    })
  } catch (err) {
    return sendErrorResponse({ res, err })
  }
}

// Update a Slab by the id in the request


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
      const id = req.params.id;
      const catData = await Category.findByPk(req?.body?.category_id);
      if (!catData) {
        return sendErrorResponse({ res, msg: "Category not found", status: 404 })
      }

      const { max_consumption, min_consumption, category_id, slab_id } = req.body


      const slab = await Slab.findByPk(id);
      if (!slab) {
        return sendErrorResponse({ res, msg: message.Slab_not_found, status: 404 })
      }
      // Update the slab with the new fields
      await slab.update({ max_consumption, min_consumption, category_id });

      const updatedSlab = await Slab.findOne({
        where: {
          id
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
      return sendResponse({ res, data: { slab: updatedSlab } })
    } catch (err) {
      return sendErrorResponse({ res, err })
    }
  }
]


// Delete a Slab with the specified id in the request


exports.delete = async (req, res) => {
  try {

    const { id } = req.params
    const slab = await Slab.findByPk(id);
    if (!slab) {
      return sendErrorResponse({
        res,
        msg: message.Subcategory_not_found,
        status: 404
      })
    }
    const deleteData = await Slab.destroy({ where: { id } });
    // Check if any row was deleted (deleteData will be the count of affected rows)
    if (deleteData === 0) {
      return sendErrorResponse({
        res,
        msg: message.Subcategory_not_deleted,
        status: 404
      })
    }
    // If deletion was successful, return a success response
    return sendResponse({ res, data: { message: message.Subcategory_Deleted } });
  } catch (error) {
    return sendErrorResponse(res, error, message.Server_Error, 500)
  }
}