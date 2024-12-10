module.exports = (sequelize, Sequelize) => {
    const meter_service_charges = sequelize.define("meterServices", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      connectionSize_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'connectionSizes',
          key: 'id',
        },
      },
      meter_service: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      },
    }, {
      tableName: 'meter_service',  // table name in the database
      timestamps: true,           // automatically adds createdAt, updatedAt fields
      paranoid: true              // adds deletedAt for soft deletes
    });
  
    meter_service_charges.associate = (models) => {
      // A subcategory belongs to one category
      meter_service_charges.belongsTo(models.connectionSize, {
        foreignKey: 'connectionSize_id',
        as: 'connectionSize',
      });
    };
    return meter_service_charges;
  };
  