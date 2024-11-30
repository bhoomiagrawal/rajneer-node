const express= require('express');
const consumptionRule = require("../controllers/consumptionRule.controller")
const authorize = require('../middleware/authorization');
const router = express.Router();

router.get("/", consumptionRule.getAll);
router.post("/create", consumptionRule.create);

// router.route("/get")
//     .get(protectAdmin, consumptionRule.getAll);
// router.route("/create")
//     .post(protectAdmin, consumptionRule.create);
// router.route("/edit/:id")
//     .put(protectAdmin, consumptionRule.update);
// router.route("/delete/:id")
//     .delete(protectAdmin, consumptionRule.delete);
// router.route("/get/:id")
//     .get(protectAdmin, consumptionRule.getSingle);

//   Delete all Subcategoryies
//   router.delete("/",authorize(), consumptionRule.deleteAll);

module.exports= router;