const express = require("express");
const Billing = require("../controllers/billing.controller")
// const { protectAdmin } = require("../../middleware/Authorization");
const router = express.Router();
// const authorize = require('../middleware/authorization');



router.post("/generate-bill", Billing.generateBill);


module.exports = router
