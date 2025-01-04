module.exports = (sequelize, Sequelize) => {
  const Slabs = sequelize.define(
    'slabs', // Ensure this matches the reference in `models`
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      max_consumption: {
        type: Sequelize.STRING,
      },
      min_consumption: {
        type: Sequelize.STRING,
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',
          key: 'id',
        },
        allowNull: false,
      },
      isBulk: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'slabs',
      timestamps: true,
      paranoid: true,
    }
  );

  Slabs.associate = (models) => {
    Slabs.belongsTo(models.categories, {
      foreignKey: 'category_id',
      as: 'category',
    });
  };

  return Slabs;
};
