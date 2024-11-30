const express = require("express");
const SubcategoryController = require("../controllers/subcategory.controller")
// const { protectAdmin } = require("../../middleware/Authorization");
const router = express.Router();
const authorize = require('../middleware/authorization');



router.get("/", SubcategoryController.getAll);
router.post("/create", SubcategoryController.create);

// router.route("/get")
//     .get(protectAdmin, SubcategoryController.getAll);
// router.route("/create")
//     .post(protectAdmin, SubcategoryController.create);
// router.route("/edit/:id")
//     .put(protectAdmin, SubcategoryController.update);
// router.route("/delete/:id")
//     .delete(protectAdmin, SubcategoryController.delete);
// router.route("/get/:id")
//     .get(protectAdmin, SubcategoryController.getSingle);

//   Delete all Subcategoryies
//   router.delete("/",authorize(), SubcategoryController.deleteAll);
module.exports = router