module.exports = (sequelize, Sequelize) => {
  const TariffConfiguration = sequelize.define(
    'tariffConfiguration', 
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      charge_type: {
        type: Sequelize.STRING,
      },
      connection_size_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'connection_size',
          key: 'id',
        },
        allowNull: false,
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',
          key: 'id',
        },
        allowNull: false,
      },
      slab_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'slabs',
          key: 'id',
        },
        allowNull: false,
      },
      ratePerThousand: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_by: {
        type: Sequelize.STRING,
        references: {
          model: 'users',
          key: 'sso_id',
        },
        allowNull: false,
      }
    },
    {
      tableName: 'taiff-configuration',
      timestamps: true,
      paranoid: true,
    }
  );

  TariffConfiguration.associate = (models) => {
    TariffConfiguration.belongsTo(models.users, {
      foreignKey: 'created_by',
      as: 'user_sso',
    });
  };

  return TariffConfiguration;
};
