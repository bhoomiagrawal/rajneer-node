module.exports = (sequelize, Sequelize) => {
    const AvgConsumption = sequelize.define(
      'avgConsumption', // This name should match the reference in `models`
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        cin_number: {
            type: Sequelize.STRING,
            allowNull: true,
            references: {
                model: 'consumer_Data', // Correct model name here
                key: 'cin_number', // Correct foreign key here
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          }, 
        avg_consuption: {
          type: Sequelize.STRING,
        },
        month: {
            type: Sequelize.DATE,
        },
      },
      {
        tableName: 'avg_consumption',
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
  
    return AvgConsumption;
  };
  
  