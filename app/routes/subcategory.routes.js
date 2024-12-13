const express = require("express");
const SubcategoryController = require("../controllers/subcategory.controller")
// const { protectAdmin } = require("../../middleware/Authorization");
const router = express.Router();
const authorize = require('../middleware/authorization');



router.get("/", SubcategoryController.getAll);
router.post("/", SubcategoryController.create);
router.put("/:id", SubcategoryController.update);
router.delete("/:id", SubcategoryController.delete);
router.get("/:id", SubcategoryController.getSingle);

module.exports = router