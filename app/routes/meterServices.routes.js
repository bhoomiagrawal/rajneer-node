const express= require('express');
const meterServices = require("../controllers/meterServices.controller")
const authorize = require('../middleware/authorization');
const router = express.Router();

router.get("/", meterServices.getAll);
router.post("/create", meterServices.create);

// router.route("/get")
//     .get(protectAdmin, meterServices.getAll);
// router.route("/create")
//     .post(protectAdmin, meterServices.create);
// router.route("/edit/:id")
//     .put(protectAdmin, meterServices.update);
// router.route("/delete/:id")
//     .delete(protectAdmin, meterServices.delete);
// router.route("/get/:id")
//     .get(protectAdmin, meterServices.getSingle);

//   Delete all Subcategoryies
//   router.delete("/",authorize(), meterServices.deleteAll);

module.exports= router;




