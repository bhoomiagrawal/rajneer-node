const db = require("../models");
const { sendResponse, sendErrorResponse } = require("../utils/lib");
const { categoryValidation } = require("../utils/validation");
const Category = db.categories;
const Op = db.Sequelize.Op;








// Create and Save a new Category
exports.create = (req, res) => [

  // Use the imported validation middleware
  ...categoryValidation,

  async (req, res) => {

    // Create a Category

    try {
      const { category_name, category_code } = req.body

      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return sendErrorResponse({res, err:errors.array(), status:401})
      }

      let data = await Subcategory.create({ category_name, category_code }, { new: true });
      return sendResponse({res, data})
    } catch (err) {
      return sendErrorResponse({ res, err })
    }
  }]

// Retrieve all Categories from the database.
exports.findAll = (req, res) => {
  // console.log('req', req)
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  // console.log('Category', Category)
  Category.findAll({ where: condition })
    .then(data => {
      sendResponse({res, data})
    })
    .catch(err => {
      sendErrorResponse({res, err})

    });
};

// Find a single Category with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Category.findByPk(id)
    .then(data => {
      if (data) {
        sendResponse({res, data})

      } else {
        sendErrorResponse({res,  msg: `Cannot find Category with id=${id}.`, status : 404})


      }
    })
    .catch(err => {
      sendErrorResponse({res, err})

    });
};

// Update a Category by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Category.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Category was updated successfully."
        });

      } else {
        res.send({
          message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Category with id=" + id
      });
    });
};

// Delete a Category with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Category.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Category was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Category with id=" + id
      });
    });
};

// // Delete all Categories from the database.
// exports.deleteAll = (req, res) => {
//   Category.destroy({
//     where: {},
//     truncate: false
//   })
//     .then(nums => {
//       res.send({ message: `${nums} Categories were deleted successfully!` });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all categories."
//       });
//     });
// };

// // find all published Category
// exports.findAllPublished = (req, res) => {
//   Category.findAll({ where: { published: true } })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving categories."
//       });
//     });
// };
