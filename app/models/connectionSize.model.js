module.exports = (sequelize, Sequelize) => {
    const ConnectionSize = sequelize.define("connectionSize", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      size: {
        type: Sequelize.STRING
      },      
    }, {
      tableName: 'connection_size', // table name in the database
      timestamps: true,           // automatically adds createdAt, updatedAt fields
      paranoid: true              // adds deletedAt for soft deletes
    });
    ConnectionSize.associate = (models) => {
        // A connection can have many connection Sizes
        ConnectionSize.hasMany(models.meterServices, {
          foreignKey: 'connectionSize_id',
          as: 'meterServices',
        });
      };
    return ConnectionSize;
  };