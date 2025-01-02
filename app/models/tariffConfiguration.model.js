



module.exports = (sequelize, Sequelize) => {
  const TariffConfiguration = sequelize.define(
      "tariffConfiguration", // Model name
      {
          id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true,
          },
          charge_type_id: {
              type: Sequelize.INTEGER,
              allowNull: true, // Foreign key is nullable
              references: {
                  model: 'charge_type', // Reference the correct table name
                  key: 'id',
              },
              onDelete: 'CASCADE', // Delete all tariffs if the chargeType is deleted
              onUpdate: 'CASCADE',
          },
          connection_size_id: {
              type: Sequelize.INTEGER,
              allowNull: true,
              references: {
                  model: 'connection_size', // Correctly reference connection_size table
                  key: 'id',
              },
              onDelete: 'SET NULL',
              onUpdate: 'CASCADE',
          },
          category_id: {
              type: Sequelize.INTEGER,
              allowNull: true, // Foreign key is nullable
              references: {
                  model: 'categories', // Correctly reference categories table
                  key: 'id',
              },
              onDelete: 'NO ACTION',
              onUpdate: 'CASCADE',
          },
          slab_id: {
              type: Sequelize.INTEGER,
              allowNull: true,
              references: {
                  model: 'slabs', // Correctly reference slabs table
                  key: 'id',
              },
              onDelete: 'SET NULL',
              onUpdate: 'CASCADE',
          },
          ratePerThousand: {
              type: Sequelize.FLOAT,
              allowNull: false,
          },
          created_by: {
              type: Sequelize.STRING,
              allowNull: false,
              references: {
                  model: 'users', // Correctly reference users table
                  key: 'sso_id',
              },
              onDelete: 'NO ACTION',
              onUpdate: 'CASCADE',
          },
      },
      {
          tableName: 'tariff_configuration', // Table name in the database
          timestamps: true,
          paranoid: true,
      }
  );

  TariffConfiguration.associate = (models) => {
      // Relationships
      TariffConfiguration.belongsTo(models.chargeType, {
          foreignKey: 'charge_type_id',
          as: 'chargeType', // Alias for chargeType relationship
      });

      TariffConfiguration.belongsTo(models.connectionSize, {
          foreignKey: 'connection_size_id',
          as: 'connectionSize', // Alias for connectionSize relationship
      });

      TariffConfiguration.belongsTo(models.categories, {
          foreignKey: 'category_id',
          as: 'category', // Alias for category relationship
      });

      TariffConfiguration.belongsTo(models.slabs, {
          foreignKey: 'slab_id',
          as: 'slab', // Alias for slab relationship
      });

      TariffConfiguration.belongsTo(models.users, {
          foreignKey: 'created_by',
          as: 'createdBy', // Alias for createdBy relationship
      });
  };

  return TariffConfiguration;
};
