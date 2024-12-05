module.exports = (sequelize, Sequelize) => {
  const Categories = sequelize.define(
    'categories', // This name should match the reference in `models`
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      category_name: {
        type: Sequelize.STRING,
      },
      category_code: {
        type: Sequelize.STRING,
      },
    },
    {
      tableName: 'categories',
      timestamps: true,
      paranoid: true,
    }
  );

  Categories.associate = (models) => {
    Categories.hasMany(models.subcategories, {
      as: 'subcategories',
      foreignKey: 'category_id',
    });

    Categories.hasMany(models.slabs, {
      foreignKey: 'category_id',
      as: 'slabs',
    });
  };

  return Categories;
};


// Categories.hasMany(models.subcategories, {
//   as: 'subcategories',
//   foreignKey: 'category_id',
// });

// Categories.hasMany(models.subcategories, {
//   as: 'categories',  // Change alias to 'categories'
//   foreignKey: 'category_id',
// });
