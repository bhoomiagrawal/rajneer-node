const express = require("express");
const ConnectionType = require("../controllers/connectionType.controller")
// const { protectAdmin } = require("../../middleware/Authorization");
const router = express.Router();
const authorize = require('../middleware/authorization');



router.get("/", ConnectionType.getAll);
router.post("/", ConnectionType.create);
router.put("/:id", ConnectionType.update);
router.delete("/:id", ConnectionType.delete);
router.get("/:id", ConnectionType.getSingle);

module.exports = router