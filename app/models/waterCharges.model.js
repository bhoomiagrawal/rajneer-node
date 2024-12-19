module.exports = (sequelize, DataTypes) => {
    const WaterCharge = sequelize.define("waterCharges", {
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
      tableName: "water_charge",
      timestamps: true,
    });
  
    // Associations
    WaterCharge.associate = (models) => {
      WaterCharge.belongsTo(models.tariffConfiguration, {
        foreignKey: "tariff_id",
        as: "tariff",
      });
    };
  
    return WaterCharge;
  };
  