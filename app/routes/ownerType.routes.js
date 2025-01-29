const express = require("express");
const OwnerTypeController = require("../controllers/ownerType.controller"); // Update with correct path to your controller
const authorize = require('../middleware/authorization');  // Optional: if you have authorization middleware
const router = express.Router();

// // Route to get all owner type list
// router.get("/", OwnerTypeController.getAll);

// Route to create a new owner type
router.post("/", OwnerTypeController.create);

// // Route to update a owner type by ID
// router.put("/:id", OwnerTypeController.update);

// // Route to delete a owner type by ID
// router.delete("/:id", OwnerTypeController.delete);

// // Route to get a single owner type by ID
// router.get("/:id", OwnerTypeController.getSingle);

module.exports = router;