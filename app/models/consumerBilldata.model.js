module.exports = (sequelize, Sequelize) => {
  const ConsumerBillData = sequelize.define(
    "consumerBillData",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      consumerdata_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "consumer_data", // Links to consumer profile
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      bill_no: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      division: {
        type: Sequelize.STRING,
      },
    //   sdo_id: {
    //     type: Sequelize.INTEGER,
    //     allowNull: true,
    //     references: {
    //         model: 'm_office', // Correct model name here
    //         key: 'office_level_id', // Correct foreign key here
    //     },
    //     onDelete: 'SET NULL',
    //     onUpdate: 'CASCADE',
    // },
      group: {
        type: Sequelize.STRING,
      },
      chk: {
        type: Sequelize.STRING,
      },
      bill_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "categories",
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
      name: {
        type: Sequelize.STRING,
      },
      service_no: {
        type: Sequelize.STRING,
      },
      account_no: {
        type: Sequelize.STRING,
      },
      meter_size: {
        type: Sequelize.STRING,
      },
      bill_month: {
        type: Sequelize.STRING,
      },
      last_reading: {
        type: Sequelize.STRING,
      },
      bill_date: {
        type: Sequelize.DATE,
      },
      cheque_date: {
        type: Sequelize.DATE,
      },
      cash_date: {
        type: Sequelize.DATE,
      },
      no_of_months: {
        type: Sequelize.INTEGER,
      },
      read_date: {
        type: Sequelize.DATE,
      },
      read_date1: {
        type: Sequelize.DATE,
      },
      curr_reading: {
        type: Sequelize.STRING,
      },
      curr_reading1: {
        type: Sequelize.STRING,
      },
      curr_meter_status: {
        type: Sequelize.STRING,
      },
      curr_meter_status1: {
        type: Sequelize.STRING,
      },
      curr_consumption: {
        type: Sequelize.STRING,
      },
      curr_consumption1: {
        type: Sequelize.STRING,
      },
      avg_consumption: {
        type: Sequelize.STRING,
      },
      avg_consumption1: {
        type: Sequelize.STRING,
      },
      curr_water_chg: {
        type: Sequelize.STRING,
      },
      curr_water_chg1: {
        type: Sequelize.STRING,
      },
      curr_swtax: {
        type: Sequelize.STRING,
      },
      curr_swtax1: {
        type: Sequelize.STRING,
      },
      curr_meter_chg: {
        type: Sequelize.STRING,
      },

      curr_meter_chg1: {
        type: Sequelize.STRING,
      },
      curr_idc: {
        type: Sequelize.STRING,
      },

      curr_idc1: {
        type: Sequelize.STRING,
      },
      curr_interest: {
        type: Sequelize.STRING,
      },
      outstanding_amount: {
        type: Sequelize.STRING,
      },
      outstanding_interest: {
        type: Sequelize.STRING,
      },
      curr_round_off: {
        type: Sequelize.STRING,
      },
      lps_amount: {
        type: Sequelize.STRING,
      },
      total_amount: {
        type: Sequelize.STRING,
      },
      in_date: {
        type: Sequelize.DATE,
      },
      rebate_off: {
        type: Sequelize.STRING,
      },

      // 🆕 Added Fields (with "1" suffix)
    },
    {
      tableName: "consumer_bill_data",
      timestamps: true,
      paranoid: true,
    }
  );

  ConsumerBillData.associate = (models) => {
    ConsumerBillData.belongsTo(models.categories, {
      foreignKey: "category_id",
      as: "category",
    });
    ConsumerBillData.belongsTo(models.connectionType, {
      foreignKey: "connection_type_id",
      as: "connectionType",
    });
    ConsumerBillData.belongsTo(models.connectionSize, {
      foreignKey: "connection_size_id",
      as: "connectionSize",
    });
    ConsumerBillData.belongsTo(models.meterStatus, {
      foreignKey: "meter_status_id",
      as: "meterStatus",
    });
    ConsumerBillData.belongsTo(models.Office, {
      foreignKey: "sdo_id",
      as: "sdo",
    });

    ConsumerBillData.belongsTo(models.consumerData, {
      foreignKey: "consumerdata_id",
      targetKey: "id",
      as: "consumer",
    });
  };

  return ConsumerBillData;
};
