const express = require("express");
const ConsumersData = require("../controllers/consumerData.controller")
const router = express.Router();



// router.get("/", consumerData.getAll);
router.post("/", ConsumersData.create);

module.exports = router