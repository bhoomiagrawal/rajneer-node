module.exports = (sequelize, Sequelize) => {
    const OwnerType = sequelize.define(
      'ownertype', // This name should match the reference in `models`
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        owner_type_name: {
          type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.INTEGER, // Active (1) / Inactive (0)
            allowNull: false,
            defaultValue: 1
        },
      },
      {
        tableName: 'owner_type',
        timestamps: true,
        paranoid: true,
      }
    );
  
    // Categories.associate = (models) => {
    //   Categories.hasMany(models.subcategories, {
    //     as: 'subcategories',
    //     foreignKey: 'category_id',
    //   });
  
    //   Categories.hasMany(models.slabs, {
    //     foreignKey: 'category_id',
    //     as: 'slabs',
    //   });
  
    //   Categories.hasMany(models.consumerData, {
    //     foreignKey: 'category_id',
    //     as: 'consumerData',
    //   });
  
    // };
  
    return OwnerType;
  };
  
  