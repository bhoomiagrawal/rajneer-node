const express = require("express");
const TariffConfiguration = require("../controllers/tariffConfiguration.controller")
// const { protectAdmin } = require("../../middleware/Authorization");
const router = express.Router();
// const authorize = require('../middleware/authorization');



router.post("/", TariffConfiguration.create);


module.exports = router
