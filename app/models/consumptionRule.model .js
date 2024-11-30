module.exports = (sequelize, Sequelize) => {
    const consumption_rules = sequelize.define("consumption_rules", {
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
      tableName: 'consumption_rules', // table name in the database
      timestamps: true,           // automatically adds createdAt, updatedAt fields
      paranoid: true              // adds deletedAt for soft deletes
    });
  
    return consumption_rules;
  };
  