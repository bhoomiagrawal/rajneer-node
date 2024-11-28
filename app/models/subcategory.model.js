// models/subcategory.js
module.exports = (sequelize, DataTypes) => {
    const Subcategory = sequelize.define('Subcategory', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      categoryId: {   // Foreign Key reference to the Category table
        type: DataTypes.INTEGER,
        references: {
          model: 'Categories', // refers to the Category model
          key: 'id'
        },
        allowNull: false
      },
      subcategoryName: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'subcategories', // table name in the database
      timestamps: true,           // automatically adds createdAt, updatedAt fields
      paranoid: true              // adds deletedAt for soft deletes
    });
  
    Subcategory.associate = (models) => {
      Subcategory.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category'
      });
    };
  
    return Subcategory;
  };
  