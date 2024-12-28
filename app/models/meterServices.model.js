module.exports = (sequelize, Sequelize) => {
  const MeterServices = sequelize.define(
    "meterServices",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      connection_size_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "connection_size", // Correct table name
          key: "id",
        },
        allowNull: false,
      },
      tariff_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "tariff_configuration", // Name of the table
          key: "id",
        },
        allowNull: false,
      },
      meter_service_charge: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.INTEGER,
      },
    },
    {
      tableName: "meter_service_charges",
      timestamps: true,
      paranoid: true,
    }
  );

  MeterServices.associate = (models) => {
    // A meter service belongs to one connection size
    MeterServices.belongsTo(models.connectionSize, {
      foreignKey: "connection_size_id",
      as: "connectionSize",
    });

    MeterServices.belongsTo(models.tariffConfiguration, {
      foreignKey: "tariff_id",
      as: "tariff",
    });
  };

  return MeterServices;
};
