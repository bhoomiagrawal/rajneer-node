const express = require("express");
const meterStatusRule = require("../controllers/meterStatus.controller")
const authorize = require('../middleware/authorization');
const router = express.Router();

//create all the route 
// router.get("/", meterStatusRule.getAll);
router.post("/", meterStatusRule.create);
// router.put("/edit/:id", meterStatusRule.update);
// router.delete("/delete/:id", meterStatusRule.delete);
// router.get("/get/:id", meterStatusRule.getSingle);

module.exports = router