const express= require('express');
const connectionSize = require("../controllers/connectionSize.controller")
const authorize = require('../middleware/authorization');
const router = express.Router();

router.get("/", connectionSize.getAll);
router.post("/create", connectionSize.create);

// router.route("/get")
//     .get(protectAdmin, connectionSize.getAll);
// router.route("/create")
//     .post(protectAdmin, connectionSize.create);
// router.route("/edit/:id")
//     .put(protectAdmin, connectionSize.update);
// router.route("/delete/:id")
//     .delete(protectAdmin, connectionSize.delete);
// router.route("/get/:id")
//     .get(protectAdmin, connectionSize.getSingle);

//   Delete all Subcategoryies
//   router.delete("/",authorize(), connectionSize.deleteAll);

module.exports= router;