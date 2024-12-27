const express = require("express");
const BinderController = require("../controllers/binder.controller"); // Update with correct path to your controller
const authorize = require('../middleware/authorization');  // Optional: if you have authorization middleware
const router = express.Router();

// Route to get all billing agencies (with pagination and search)
router.get("/", BinderController.getAll);

// Route to create a new billing agency
router.post("/", BinderController.create);

// Route to update a billing agency by ID
router.put("/:id", BinderController.update);

// Route to delete a billing agency by ID
router.delete("/:id", BinderController.delete);

// Route to get a single billing agency by ID
router.get("/:id", BinderController.getSingle);

module.exports = router;