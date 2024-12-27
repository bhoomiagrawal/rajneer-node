module.exports = (sequelize, Sequelize) => {
  const ChargeType = sequelize.define(
      "chargeType", // Model name
      {
          id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true,
          },
          charge_name: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          status: {
            type: Sequelize.INTEGER, // Active (1) / Inactive (0)
            allowNull: false,
            defaultValue: 1
        },
      },
      {
          tableName: 'charge_type', // Ensure the table name is correct
          timestamps: true,
          paranoid: true,
      }
  );

  ChargeType.associate = (models) => {
      // Relationship with tariffConfiguration
      ChargeType.hasMany(models.tariffConfiguration, {
          foreignKey: 'charge_type_id', // Foreign key in tariffConfiguration
          as: 'tariffConfigurations',  // Alias for the relationship
      });
  };

  return ChargeType;
};
