// const dbConfig = require("../config/db.config.js");
// const fs = require('fs');
// const path = require('path');
// const Sequelize = require("sequelize");
// const basename = path.basename(__filename);
// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect,
//   operatorsAliases: false,

//   // pool: {
//   //   max: dbConfig.pool.max,
//   //   min: dbConfig.pool.min,
//   //   acquire: dbConfig.pool.acquire,
//   //   idle: dbConfig.pool.idle
//   // }
// });

// const db = {};



// // db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
// // db.categories = require("./categories.model.js")(sequelize, Sequelize);
// // db.subcategories = require("./subcategories.model.js")(sequelize, Sequelize);
// // db.slabs = require("./slabs.model.js")(sequelize, Sequelize);

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// fs.readdirSync(__dirname)
//   .filter((file) => file !== basename && file.endsWith('.model.js'))
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize);
//     db[model.name] = model;
//   });

// // Set up associations
// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });


// console.log(Object.keys(db)); // Should include 'Category', 'Slab'
// console.log(db.categories.associations); // Should show 'slabs'
// console.log(db.slabs.associations); // Should show 'category'


// // db.categories.associate({subcategories: db.subcategories, slabs: db.slabs});
// module.exports = db;



const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const dbConfig = require('../config/db.config.js');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
});

const db = {};

// Load all models
fs.readdirSync(__dirname)
  .filter((file) => file !== basename && file.endsWith('.model.js'))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);
    db[model.name] = model; // Model name is used as key
  });

// Set up associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db); // Pass `db` for associations
  }
});
console.log(db.categories.associations); // Should include 'slabs'
console.log(db.slabs.associations); // Should include 'category'





db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Debug associations
console.log('Models loaded:', Object.keys(db));
console.log('Category associations:', db.categories.associations);
console.log('Slab associations:', db.slabs.associations);

module.exports = db;
