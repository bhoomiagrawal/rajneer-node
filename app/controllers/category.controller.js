const db = require("../models");
const { sendResponse } = require("../utils/lib");
const Category = db.categories;
const Op = db.Sequelize.Op;

// Create and Save a new Category
exports.create = (req, res) => {
  // Validate request
  if (!req.body.category_name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Category

  let { category_name, category_code,} = req.body
  // Save Category in the database
  Category.create({category_name, category_code})
    .then(data => {
      sendResponse(res, data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Category."
      });
    });
};

// Retrieve all Categories from the database.
exports.findAll = (req, res) => {
  // console.log('req', req)
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
// console.log('Category', Category)
  Category.findAll({ where: condition })
    .then(data => {
      sendResponse(res, data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    });
};

// Find a single Category with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Category.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Category with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Category with id=" + id
      });
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
