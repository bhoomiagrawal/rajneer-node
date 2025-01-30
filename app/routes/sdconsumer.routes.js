const express = require("express");
const sdConsumer = require("../controllers/sdconsumer.controller")
const router = express.Router();



// router.get("/", consumerData.getAll);
router.get("/grp-chk", sdConsumer.chkGroupCombinations);
router.get("/grp-chk-consumers/:chkGroup", sdConsumer.consumersByChkGroup);

module.exports = router