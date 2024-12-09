module.exports = (sequelize, Sequelize) => {
    const meter_status_rules = sequelize.define("meter_status", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      meter_status: {
        type: Sequelize.STRING
      },
      rule: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      },
    }, {
      tableName: 'meter_status', // table name in the database
      timestamps: true,           // automatically adds createdAt, updatedAt fields
      paranoid: true              // adds deletedAt for soft deletes
    });
  
    return meter_status_rules;
  };
  