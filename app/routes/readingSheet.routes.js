const express = require("express");
const GenratedBillController = require("../controllers/genratedBill.controller"); // Update with correct path to your controller
const authorize = require('../middleware/authorization');  // Optional: if you have authorization middleware
const { createReadingSheet } = require("../controllers/readingSheets.controller");
const router = express.Router();



// Route to create a new billing agency
router.get("/", createReadingSheet);

module.exports = router;