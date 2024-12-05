// models/subcategory.js
module.exports = (sequelize, DataTypes) => {
    const Subcategories = sequelize.define('subcategories', 
      {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      category_id: {   // Foreign Key reference to the Category table
        type: DataTypes.INTEGER,
        references: {
          model: 'categories', // refers to the Category model
          key: 'id'
        },
        allowNull: false
      },
      subcategory_name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'subcategories', // table name in the database
      timestamps: true,           // automatically adds createdAt, updatedAt fields
      paranoid: true              // adds deletedAt for soft deletes
    });
  
    Subcategories.associate = (models) => {
      // A subcategory belongs to one category
      Subcategories.belongsTo(models.categories, {
        as: 'categories',
        foreignKey: 'category_id',
      });
    };
  
  
    return Subcategories;
  };
  