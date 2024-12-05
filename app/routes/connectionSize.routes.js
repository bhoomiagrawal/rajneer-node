const express = require("express");
const ConnectionSize = require("../controllers/connectionSize.controller")
// const { protectAdmin } = require("../../middleware/Authorization");
const router = express.Router();
const authorize = require('../middleware/authorization');



router.get("/", ConnectionSize.getAll);
router.post("/", ConnectionSize.create);
router.put("/edit/:id", ConnectionSize.update);
router.delete("/delete/:id", ConnectionSize.delete);
router.get("/get/:id", ConnectionSize.getSingle);

module.exports = router
