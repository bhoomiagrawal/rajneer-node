module.exports = (sequelize, Sequelize) => {
  const ConnectionSize = sequelize.define(
      'connectionSize', // Model name
      {
          id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true,
          },
          size: {
              type: Sequelize.STRING,
              allowNull: false,
          },
      },
      {
          tableName: 'connection_size', // Table name in the database
          timestamps: true,            // Automatically add createdAt and updatedAt
          paranoid: true,              // Add deletedAt for soft deletes
      }
  );

  ConnectionSize.associate = (models) => {
      // Relationships
      ConnectionSize.hasMany(models.fixedCharges, {
          foreignKey: 'connection_size_id', // Foreign key in the FixedCharges model
          as: 'fixedCharges',             // Alias for the relationship
          onDelete: 'CASCADE',            // Cascade on delete
      });

      // Relationships
      ConnectionSize.hasMany(models.consumerData, {
          foreignKey: 'connection_size_id', // Foreign key in the FixedCharges model
          as: 'consumerData',             // Alias for the relationship
          onDelete: 'CASCADE',            // Cascade on delete
      });
  };

  return ConnectionSize;
};
