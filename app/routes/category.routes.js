  const categories = require("../controllers/category.controller.js");

  var router = require("express").Router();
const authorize = require('../middleware/authorization');


  // Create a new Category
  router.post("/",  categories.create);

  // Retrieve all Categories
  router.get("/", categories.findAll);

  // Retrieve all published Categories
  // router.get("/published", categories.findAllPublished);

  // Retrieve a single Category with id
  router.get("/:id", categories.findOne);

  // Update a Category with id
  router.put("/:id", categories.update);

  // Delete a Category with id
  router.delete("/:id", categories.delete);

  // Delete all Categories
  router.delete("/",authorize(), categories.deleteAll);


module.exports = router;
