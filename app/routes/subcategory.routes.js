const express = require("express");
const SubcategoryController = require("../controllers/subcategory.controller")
// const { protectAdmin } = require("../../middleware/Authorization");
const router = express.Router();

router.get("/", SubcategoryController.getAllSubcategory);

// router.route("/get")
//     .get(protectAdmin, SubcategoryController.getAllSubcategory);
// router.route("/create")
//     .post(protectAdmin, SubcategoryController.createSubcategory);
// router.route("/edit/:id")
//     .put(protectAdmin, SubcategoryController.updateSubcategory);
// router.route("/delete/:id")
//     .delete(protectAdmin, SubcategoryController.deleteSubcategory);
// router.route("/get/:id")
//     .get(protectAdmin, SubcategoryController.getSingleSubcategory);

module.exports = router