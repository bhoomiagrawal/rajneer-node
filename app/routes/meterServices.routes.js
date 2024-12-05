const express = require("express");
const meterServices = require("../controllers/meterServices.controller")
const authorize = require('../middleware/authorization');
const router = express.Router();



router.get("/", meterServices.getAll);
router.post("/", meterServices.create);
router.put("/edit/:id", meterServices.update);
router.delete("/delete/:id", meterServices.delete);
router.get("/get/:id", meterServices.getSingle);

module.exports = router







