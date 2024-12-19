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
      type: DataTypes.ENUM("fixed_charges", "meter_service_charges", "water_charges", "minimum_charges", "idc", ),

      },
      connection_size_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'connection_size',
          key: 'id',
        },
        allowNull: true,
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
        allowNull: true,
      },
      
      ratePerThousand: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      
      created_by: {
        type: Sequelize.STRING,
        references: {
          model: 'users',
          key: 'sso_id',
        },
        allowNull: false,
      },

     
    },
    {
      tableName: 'taiff-configuration',
      timestamps: true,
      paranoid: true,
    }
  );

  TariffConfiguration.associate = (models) => {
    TariffConfiguration.belongsTo(models.slabs, { foreignKey: "slab_id", as: "slab" });
    TariffConfiguration.belongsTo(models.categories, { foreignKey: "category_id", as: "category" });
    TariffConfiguration.belongsTo(models.connectionSize, { foreignKey: "connection_size_id", as: "connectionSize" });
    TariffConfiguration.belongsTo(models.users, {
      foreignKey: 'created_by',
      as: 'user_sso',
    });
  };

  return TariffConfiguration;





};
