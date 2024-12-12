const slabs = require("../controllers/slabs.controller.js");

var router = require("express").Router();
const authorize = require('../middleware/authorization');


// Create a new Slab
router.post("/", slabs.create);

// Retrieve all Slabs
router.get("/", slabs.getAll);


// Retrieve a single Slab with id
router.get("/:id", slabs.getSingle);

// Update a Slab with id
router.put("/:id", slabs.update);

// Delete a Slab with id
router.delete("/:id", slabs.delete);



module.exports = router;
