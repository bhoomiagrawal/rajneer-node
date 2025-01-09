module.exports = (sequelize, DataTypes) => {
    const IdcCharge = sequelize.define("idcCharges", {
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
      tableName: "idc_charge",
      timestamps: true,
    });
  
    // Associations
    IdcCharge.associate = (models) => {
      IdcCharge.belongsTo(models.tariffConfiguration, {
        foreignKey: "tariff_id",
        as: "tariff",
      });
    };
  
    return IdcCharge;
  };
  