module.exports = (sequelize, Sequelize) => {
    const ChargeType = sequelize.define("chargeType", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      charge_name: {
        type: Sequelize.STRING
      },  
      status: {
        type: Sequelize.INTEGER
      },   
    }, {
      tableName: 'charge_type', // table name in the database
      timestamps: true,           // automatically adds createdAt, updatedAt fields
      paranoid: true              // adds deletedAt for soft deletes
    });
    
    return ChargeType;
  };