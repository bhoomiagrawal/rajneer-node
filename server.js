const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
const db = require("./app/models");

const loadRoutes = require('./app/routes');
const logger = require('./app/middleware/logger');


// var corsOptions = {
//   origin: "http://localhost:8081"
// };

// Configure CORS
const corsOptions = {
  origin: '*', // Allow all origins. Replace '*' with a specific origin or array of origins for better security.
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
};


// Enable CORS with the options
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// drop the table if it already exists
// db.sequelize.sync({  alter: true , force: true,}).then(() => {
//   console.log("Drop and re-sync db.");
// });






// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// const subcategoryRouting = require("./app/routes/subcategory.routes");

// app.use("/subcategory", subcategoryRouting);

// require("./app/routes/turorial.routes")(app);

// Middleware
app.use(bodyParser.json());
app.use(logger);

// Dynamically load and register all routes
loadRoutes(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


