module.exports = (sequelize, DataTypes) => {
    const StpCharge = sequelize.define("stpCharges", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tariff_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "tariff_configuration", // Name of the table
          key: "id",
        },
        allowNull: false,
      },
      extra_details: {
        type: DataTypes.TEXT,
        allowNull: true, // Optional
      },
    }, {
      tableName: "stp_charges",
      timestamps: true,
    });
  
    // Associations
    StpCharge.associate = (models) => {
      StpCharge.belongsTo(models.tariffConfiguration, {
        foreignKey: "tariff_id",
        as: "tariff",
      });
    };
  
    return StpCharge;
  };
  