const express = require("express");
const BillingAgencyController = require("../controllers/bAEnroll.controller"); // Update with correct path to your controller
const authorize = require('../middleware/authorization');  // Optional: if you have authorization middleware
const router = express.Router();

// Route to get all billing agencies (with pagination and search)
// router.get("/", BillingAgencyController.getAll);

// Route to create a new billing agency
router.post("/", BillingAgencyController.create);

// // Route to update a billing agency by ID
// router.put("/:id", BillingAgencyController.update);

// // Route to delete a billing agency by ID
// router.delete("/:id", BillingAgencyController.delete);

// // Route to get a single billing agency by ID
// router.get("/:id", BillingAgencyController.getSingle);

module.exports = router;
