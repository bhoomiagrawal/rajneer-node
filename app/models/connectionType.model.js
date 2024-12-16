module.exports = (sequelize, Sequelize) => {
    const ConnectionType = sequelize.define("connectionType", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      conn_type: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },   
      status: {
        type: Sequelize.INTEGER
      },   
    }, {
      tableName: 'connection_type', // table name in the database
      timestamps: true,           // automatically adds createdAt, updatedAt fields
      paranoid: true              // adds deletedAt for soft deletes
    });
    
    return ConnectionType;
  };