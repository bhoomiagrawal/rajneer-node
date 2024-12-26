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
    /*
    // Use TEXT type for longer content
    description: {
      type: Sequelize.TEXT
    }, 
    // Increase the length of the column
    description: {
    type: Sequelize.STRING(500) // Adjust the number as needed
    },
    */
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