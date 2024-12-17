module.exports = (sequelize, DataTypes) => {
  const MinimumCharges = sequelize.define(
    'minimumCharges',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      minimum_charge: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'categories', // Ensure the categories table exists
          key: 'id',
        },
        allowNull: false,
      },
      connection_size_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'connection_size', // Ensure the connection_size table exists
          key: 'id',
        },
        allowNull: false,
      },
    },
    {
      tableName: 'minimum_charges', // Database table name
      timestamps: true,            // Adds createdAt and updatedAt
      paranoid: true,              // Adds deletedAt for soft deletes
    }
  );

  // Associations
  MinimumCharges.associate = (models) => {
    // Associate with Category
    MinimumCharges.belongsTo(models.Categories, {
      foreignKey: 'category_id',
      as: 'category',
    });

    // Associate with ConnectionSize
    MinimumCharges.belongsTo(models.ConnectionSize, {
      foreignKey: 'connection_size_id',
      as: 'connectionSize',
    });
  };

  return MinimumCharges;
};
