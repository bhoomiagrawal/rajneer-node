const db = require("../models");
const Slab = db.slabs;
const Op = db.Sequelize.Op;


exports.create = async (req, res) => {
  try {
    // Extract data from the request body
    const { max_consumption, min_consumption, category_id, isBulk } = req.body;
    

    // Create a new Slab record
    const newSlab = await db.slabs.create(
      {
        max_consumption,
        min_consumption,
        category_id,
        isBulk,
      },
      
    );


    // Step 2: Fetch the Slab with its associated Category
    const slabWithCategory = await db.slabs.findByPk(newSlab.id, {
      include: [
        {
          model: db.categories,
          as: 'category', // Alias defined in Slabs.belongsTo
        },
      ],
    });
    // Respond with the created slab and associated category data
    return res.status(201).json({
      message: 'Slab created successfully',
      data: slabWithCategory,
    });
  } catch (error) {
    console.error('Error creating slab:', error);
    return res.status(500).json({
      message: 'Error creating slab',
      error: error.message,
    });
  }
};


// Retrieve all Slabs from the database.
exports.findAll = (req, res) => {
  console.log('req', req)
  // const title = req.query.title;
  // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Slab.findAll(
    // { where: condition }
  )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving slabs."
      });
    });
};

// Find a single Slab with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Slab.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Slab with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Slab with id=" + id
      });
    });
};

// Update a Slab by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Slab.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Slab updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Slab with id=${id}. Maybe Slab was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Slab with id=" + id
      });
    });
};

// Delete a Slab with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Slab.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Slab was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Slab with id=${id}. Maybe Slab was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Slab with id=" + id
      });
    });
};

// // Delete all Slabs from the database.
// exports.deleteAll = (req, res) => {
//   Slab.destroy({
//     where: {},
//     truncate: false
//   })
//     .then(nums => {
//       res.send({ message: `${nums} Slabs were deleted successfully!` });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all slabs."
//       });
//     });
// };

// // find all published Slab
// exports.findAllPublished = (req, res) => {
//   console.log('reqasdadadadasdasdasdasdasdasdasdasd', req)
//   Slab.findAll({ where: { published: true } })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving slabs."
//       });
//     });
// };
