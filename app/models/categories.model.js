module.exports = (sequelize, Sequelize) => {
  const Categories = sequelize.define("categories", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    category_name: {
      type: Sequelize.STRING
    },
    category_code: {
      type: Sequelize.STRING
    },
  
  }, {
    tableName: 'categories', // table name in the database
    timestamps: true,           // automatically adds createdAt, updatedAt fields
    paranoid: true              // adds deletedAt for soft deletes
  });

  return Categories;
};
