// models/subcategory.js
module.exports = (sequelize, DataTypes) => {
    const Subcategory = sequelize.define('subcategories', {
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
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'subcategories', // table name in the database
      timestamps: true,           // automatically adds createdAt, updatedAt fields
      paranoid: true              // adds deletedAt for soft deletes
    });
  
    Subcategory.associate = (models) => {
      Subcategory.belongsTo(models.Categories, {
        foreignKey: 'id',
        as: 'categories'
      });
    };
  
    return Subcategory;
  };
  