const express = require("express");
const ChargeType = require("../controllers/chargeType.controller")
// const { protectAdmin } = require("../../middleware/Authorization");
const router = express.Router();
const authorize = require('../middleware/authorization');



router.get("/", ChargeType.getAll);
router.post("/", ChargeType.create);
router.put("/:id", ChargeType.update);
router.delete("/:id", ChargeType.delete);
router.get("/:id", ChargeType.getSingle);

module.exports = router