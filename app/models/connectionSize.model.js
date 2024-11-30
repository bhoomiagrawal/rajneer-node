module.exports = (sequelize, Sequelize) => {
    const ConnectionSize = sequelize.define("connectionSizes", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Connection_Size: {
        type: Sequelize.STRING
      },      
    }, {
      tableName: 'connectionSizes', // table name in the database
      timestamps: true,           // automatically adds createdAt, updatedAt fields
      paranoid: true              // adds deletedAt for soft deletes
    });
  
    return ConnectionSize;
  };