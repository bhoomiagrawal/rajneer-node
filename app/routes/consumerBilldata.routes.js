const express = require("express");
const consumerBillData = require("../controllers/consumerBilldata.controller")
const router = express.Router();



// router.get("/", consumerData.getAll);
router.post("/", consumerBillData.create);

module.exports = router