module.exports = (sequelize, Sequelize) => {
    const ConsumerBillData = sequelize.define(
      'consumerBillData', // This name should match the reference in `models`
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        // consumer_id: {
        //     type: Sequelize.INTEGER,
        //     allowNull: true, // Foreign key is nullable
        //     references: {
        //         model: 'consumerData', // Correctly reference consumerData table
        //         key: 'id',
        //     },
        //     onDelete: 'NO ACTION',
        //     onUpdate: 'CASCADE',
        // },
        curr_cons: {
          type: Sequelize.STRING,
        },
        prev_cons: {
          type: Sequelize.STRING,
        },
      },
      {
        tableName: 'consumer_bill_data',
        timestamps: true,
        paranoid: true,
      }
    ); 

    // ConsumerBillData.associate = (models) => {
    //     ConsumerBillData.belongsTo(models.consumerData, { // Ensure this matches your categories model name
    //         foreignKey: 'consumer_id',
    //         as: 'consumerData',
    //     });
    // };

    return ConsumerBillData;
  };
  
  