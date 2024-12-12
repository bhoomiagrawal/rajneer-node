const db = require("../models");
const { sendResponse, sendErrorResponse } = require("../utils/lib");
const { getPaginationAndSearch } = require("../utils/pagination");
const message = require('../utils/constant');

const { categoryValidation } = require("../utils/validation");
const { validationResult } = require("express-validator");
const Category = db.categories;
const Op = db.Sequelize.Op;








// Create and Save a new Category
exports.create = [
    // Use the imported validation middleware
    ...categoryValidation,
  async (req, res) => {

    // Create a Category

    try {
      const { category_name, category_code } = req.body

      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return sendErrorResponse({ res, err: errors.array(), status: 401 })
      }
      let data = await Category.create({ category_name, category_code }, { new: true });
      return sendResponse({ res, data })
    } catch (err) {
      console.log('err', err)
      return sendErrorResponse({ res, err })
    }
  }
]


// Retrieve all Categories from the database.
exports.getAll = async (req, res) => {

  try {
    // Use the helper to extract pagination and search information
    const { offset, perPage, whereCondition } = getPaginationAndSearch(req, 'category_name');  // Pass the field for search

    // Fetch the category list with pagination and search filter
    let categoryList = await Category.findAndCountAll({
      offset,
      limit: perPage,
      where: whereCondition,  // Apply search filter if exists

    });

    // Check if data was found
    if (!categoryList.rows.length) {
      return sendErrorResponse({
        res,
        msg: message.Record_not_found,
        status: 404
      })

    }

    return sendResponse({
      res, data: {
        category: categoryList.rows,  // Rename rows to data
        count: categoryList.count
      }
    })

  } catch (error) {
    // console.log('Error fetching subcategories: ', error);
    sendErrorResponse({ res, err: error.message })

  }


};



exports.getSingle = async (req, res) => {
  try {
    const category = await Category.findOne({
      where: {
        id: req?.params?.id
      },

    }
    );

    if (!category) {
      return sendErrorResponse({
        res, msg: message.Category_not_found
      })

    }
    return sendResponse({
      res, data: category
    })
  } catch (err) {
    // console.log(error)
    return sendErrorResponse({
      res, err
    })
  }
}


// Update a Category by the id in the request
exports.update = [
  // ...categoryValidation,
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


      const category = await Category.findByPk(id);
      if (!category) {
        return sendErrorResponse({
          res, msg: message.Category_not_found
        })

      }
      // Update the category with the new fields
      await category.update({ ...req.body });

      const updatedCategory = await Category.findOne({
        where: {
          id
        },

      }
      );
      return sendResponse({
        res, data: {
          category: updatedCategory,
          message: message.Category_Updated,
        }
      })

    } catch (err) {
      return sendErrorResponse({ res, err })

    }
  }
]



// Delete a Category with the specified id in the request




exports.delete = async (req, res) => {
  try {
    let id = req.params.id;
    const category = await Category.findByPk(id);
    if (!category) {
      return sendErrorResponse({
        res, msg: message.Category_not_found
      })

    }
    const deleteData = await Category.destroy({ where: { id } });


    // Check if any row was deleted (deleteData will be the count of affected rows)
    console.log('deleteData', deleteData)
    if (deleteData === 0) {
      return sendErrorResponse({ res, msg: message.Category_not_deleted })

    }
    // If deletion was successful, return a success response
    return sendResponse({
      res, msg: message.Category_Deleted
    })

  } catch (err) {
    return sendErrorResponse({ res, err })


  }
}

