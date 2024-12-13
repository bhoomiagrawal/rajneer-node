const express = require("express");
const meterStatus = require("../controllers/meterStatus.controller")
// const { protectAdmin } = require("../../middleware/Authorization");
const router = express.Router();
const authorize = require('../middleware/authorization');


router.get("/", meterStatus.getAll);
router.post("/", meterStatus.create);
router.put("/:id", meterStatus.update);
router.delete("/:id", meterStatus.delete);
router.get("/:id", meterStatus.getSingle);

module.exports = router
