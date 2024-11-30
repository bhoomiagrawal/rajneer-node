module.exports = (sequelize, Sequelize) => {
    const meter_service_charges = sequelize.define("meter_service_charges", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      connection_size: {
        type: Sequelize.STRING
      },
      metere_service_charge: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      },
    }, {
      tableName: 'meter_service_charges', // table name in the database
      timestamps: true,           // automatically adds createdAt, updatedAt fields
      paranoid: true              // adds deletedAt for soft deletes
    });
  
    return meter_service_charges;
  };
  