const express = require("express");
const meterServices = require("../controllers/meterServices.controller")
const authorize = require('../middleware/authorization');
const router = express.Router();



router.get("/", meterServices.getAll);
router.post("/", meterServices.create);
router.put("/:id", meterServices.update);
router.delete("/:id", meterServices.delete);
router.get("/:id", meterServices.getSingle);

module.exports = router







