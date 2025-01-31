module.exports = (sequelize, Sequelize) => {
  const GeneratedBill = sequelize.define(
    "generatedBill",
    {
      // Customer Details

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cin_number: {
        type: Sequelize.STRING, // e.g., "140120413863"
        allowNull: true,
        defaultValue: null,
      },
      noof_mnth: {
        type: Sequelize.INTEGER, // e.g., "140120413863"
        allowNull: true,
        defaultValue: 1,
      },
      bill_id: {
        type: Sequelize.STRING,
      },
      zone_code: {
        type: Sequelize.STRING, // e.g., "0"
        allowNull: true,
        defaultValue: null,
      },
      // customer_name: {
      //     type: Sequelize.STRING, // e.g., "AABID"
      //     allowNull: true,
      //     defaultValue: null,
      // },
      // customer_address: {
      //     type: Sequelize.TEXT, // e.g., "B-203 SANJAY NAGAR NAHARI KA NAKA"
      //     allowNull: true,
      //     defaultValue: null,
      // },
      mobile_number: {
        type: Sequelize.STRING, //9314126462
        allowNull: true,
        defaultValue: null,
      },
      email: {
        type: Sequelize.STRING, // example@gamil.com
        allowNull: true,
        defaultValue: null,
      },
      // Meter and Connection Details
      account_number: {
        type: Sequelize.STRING, // e.g., "09D-04-021"
        allowNull: true,
        defaultValue: null,
      },
      subdivision_number: {
        type: Sequelize.STRING, // e.g., "N1-05"
        allowNull: true,
        defaultValue: null,
      },
      bill_number: {
        type: Sequelize.STRING, // e.g., "1312"
        allowNull: true,
        defaultValue: null,
      },
      service_no: {
        type: Sequelize.STRING,
      },
      curr_meter_status_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "meter_status",
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
      prev_meter_status_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "meter_status",
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
      //create owner type also (// e.g., "GOV")
      meter_no: {
        type: Sequelize.STRING, // e.g., "64877"
        allowNull: true,
        defaultValue: null,
      },
      category: {
        type: Sequelize.ENUM("Non Domestic", "Domestic", "Industrial"), // e.g., "Domestic"
        allowNull: true,
        defaultValue: null,
      },

      connection_size: {
        type: Sequelize.STRING, // e.g., "1/2\""
        allowNull: true,
        defaultValue: null,
      },
      bill_issue_date: {
        type: Sequelize.DATE, // e.g., "2024-07-13"
        allowNull: true,
        defaultValue: null,
      },

      // Billing Data for Each Month
      prev_reading_date: {
        type: Sequelize.DATE, // e.g., "2023-01-28"
        allowNull: true,
      },
      prev_reading: {
        type: Sequelize.INTEGER, // e.g., 630000
        allowNull: true,
      },

      prev_consumption: {
        type: Sequelize.INTEGER, // e.g., 28880
        allowNull: true,
      },
      // Tariff & Charges
      prev_water_charge: {
        type: Sequelize.FLOAT, // e.g., 55.00
        allowNull: true,
        defaultValue: null,
      },
      prev_minimum_charge: {
        type: Sequelize.FLOAT, // e.g., 55.00 comes from backend
        allowNull: true,
        defaultValue: null,
      },
      prev_sewerage_charge: {
        type: Sequelize.FLOAT, // e.g., 11
        allowNull: true,
      },
      prev_stp_charge: {
        type: Sequelize.FLOAT, // e.g., 7.15
        allowNull: true,
      },
      prev_meter_service_charge: {
        type: Sequelize.FLOAT, // e.g., 22.00
        allowNull: true,
      },
      prev_fixed_charge: {
        type: Sequelize.FLOAT, // e.g., "27.50" (average fixed charge for both months)
        allowNull: true,
        defaultValue: null,
      },
      prev_idc_charge: {
        type: Sequelize.FLOAT, // e.g., "30.66" (average idc charge for both months)
        allowNull: true,
        defaultValue: null,
      },
      // current month
      curr_reading_date: {
        type: Sequelize.DATE, // e.g., "2023-01-28"
        allowNull: true,
      },
      curr_reading: {
        type: Sequelize.INTEGER, // e.g., 630000
        allowNull: true,
      },

      curr_consumption: {
        type: Sequelize.INTEGER, // e.g., 28880
        allowNull: true,
      },

      curr_avg_consumption: {
        type: Sequelize.INTEGER, // e.g., 28880
        allowNull: true,
      },
      prev_avg_consumption: {
        type: Sequelize.INTEGER, // e.g., 28880
        allowNull: true,
      },
      // Tariff & Charges
      curr_water_charge: {
        type: Sequelize.FLOAT, // e.g., 55.00
        allowNull: true,
        defaultValue: null,
      },
      curr_minimum_charge: {
        type: Sequelize.FLOAT, // e.g., 55.00 comes from backend
        allowNull: true,
        defaultValue: null,
      },
      curr_sewerage_charge: {
        type: Sequelize.FLOAT, // e.g., 11
        allowNull: true,
      },
      curr_stp_charge: {
        type: Sequelize.FLOAT, // e.g., 7.15
        allowNull: true,
      },
      curr_meter_service_charge: {
        type: Sequelize.FLOAT, // e.g., 22.00
        allowNull: true,
      },
      curr_fixed_charge: {
        type: Sequelize.FLOAT, // e.g., "27.50" (average fixed charge for both months)
        allowNull: true,
        defaultValue: null,
      },
      curr_idc_charge: {
        type: Sequelize.FLOAT, // e.g., "30.66" (average idc charge for both months)
        allowNull: true,
        defaultValue: null,
      },

      adjusted_consumption_amount: {
        type: Sequelize.FLOAT, //   समायोजित उपभोग राशि
        allowNull: true,
        defaultValue: null,
      },
      amount_borne_by_government_rebate: {
        type: Sequelize.FLOAT, //   सरकार द्वारा वहन की गयी राशि
        allowNull: true,
        defaultValue: null,
      },
      // Charges
      prev_total: {
        type: Sequelize.FLOAT, // e.g., 153.31
        allowNull: true,
      },
      curr_total: {
        type: Sequelize.FLOAT, // e.g., 153.31
        allowNull: true,
        defaultValue: null,
      },

      other_interest_charge: {
        type: Sequelize.FLOAT, // e.g., 0.38
        allowNull: true,
        defaultValue: 0,
      },
      outstanding_amount: {
        type: Sequelize.FLOAT, // e.g., 338.00
        allowNull: true,
        defaultValue: 0,
      },
      total_bill: {
        type: Sequelize.FLOAT, // e.g., 645
        allowNull: true,
        defaultValue: 0,
      },
      late_payment_surcharge: {
        type: Sequelize.FLOAT, // e.g., 31
        allowNull: true,
        defaultValue: 0,
      },
      total_bill_after_lps: {
        type: Sequelize.FLOAT, // e.g., 676
        allowNull: true,
        defaultValue: 0,
      },
      // Payment Details
      due_date_by_cheque: {
        type: Sequelize.DATE, // e.g., "2024-08-02"
        allowNull: true,
        defaultValue: null,
      },
      due_date_by_cash: {
        type: Sequelize.DATE, // e.g., "2024-08-05"
        allowNull: true,
        defaultValue: null,
      },
      // created_by: {
      //     type: Sequelize.STRING,
      //     allowNull: false,
      //     references: {
      //         model: 'users', // Correctly reference users table
      //         key: 'sso_id',
      //     },
      //     onDelete: 'NO ACTION',
      //     onUpdate: 'CASCADE',
      // },
    },
    {
      tableName: "generated_bill",
      timestamps: true,
      paranoid: true,
    }
  );
  // GeneratedBill.associate = (models) => {
  //     // Relationships
  //     GeneratedBill.belongsTo(models.users, {
  //         foreignKey: 'created_by',
  //         as: 'createdBy', // Alias for createdBy relationship
  //     });
  // };
  return GeneratedBill;
};
