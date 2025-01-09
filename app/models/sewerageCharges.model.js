module.exports = (sequelize, DataTypes) => {
    const SewerageCharge = sequelize.define("sewerageCharges", {
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
      tableName: "sewerage_charge",
      timestamps: true,
    });
  
    // Associations
    SewerageCharge.associate = (models) => {
      SewerageCharge.belongsTo(models.tariffConfiguration, {
        foreignKey: "tariff_id",
        as: "tariff",
      });
    };
  
    return SewerageCharge;
  };
  