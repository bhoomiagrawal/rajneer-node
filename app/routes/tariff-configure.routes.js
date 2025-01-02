const express = require("express");
const TariffConfiguration = require("../controllers/tariffConfiguration.controller")
// const { protectAdmin } = require("../../middleware/Authorization");
const router = express.Router();
// const authorize = require('../middleware/authorization');



router.post("/", TariffConfiguration.create);
// router.get("/", TariffConfiguration.getAll);
// router.put("/:id", TariffConfiguration.update);
// router.delete("/:id", TariffConfiguration.delete);
// router.get("/:id", TariffConfiguration.getSingle);

module.exports = router
