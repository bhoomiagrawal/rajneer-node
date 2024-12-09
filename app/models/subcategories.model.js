module.exports = (sequelize, DataTypes) => {
  const Subcategories = sequelize.define(
    'subcategories',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'categories', // refers to the Categories model
          key: 'id',
        },
        allowNull: false,
      },
      subcategory_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'subcategories', // Table name in the database
      timestamps: true,           // Automatically adds createdAt, updatedAt fields
      paranoid: true,             // Adds deletedAt for soft deletes
    }
  );

  Subcategories.associate = (models) => {
    // A subcategory belongs to one category
    Subcategories.belongsTo(models.categories, { // Ensure this matches your categories model name
      foreignKey: 'category_id',
      as: 'category',
    });
  };
  
  return Subcategories;
};
