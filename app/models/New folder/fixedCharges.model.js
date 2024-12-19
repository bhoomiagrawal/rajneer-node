module.exports = (sequelize, DataTypes) => {
  const FixedCharges = sequelize.define(
    'fixedCharges',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      connection_size_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'connection_size', // Ensure the connection_size table exists
          key: 'id',
        },
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
      fixed_charges: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      tableName: 'fixed_charges', // Database table name
      timestamps: true,           // Adds createdAt and updatedAt
      paranoid: true,             // Adds deletedAt for soft deletes
    }
  );

  // Associations
  FixedCharges.associate = (models) => {
    // Associate with ConnectionSize
    FixedCharges.belongsTo(models.ConnectionSize, {
      foreignKey: 'connection_size_id',
      as: 'connectionSize',
    });

    // Associate with Category
    FixedCharges.belongsTo(models.Categories, {
      foreignKey: 'category_id',
      as: 'category',
    });
  };

  return FixedCharges;
};
