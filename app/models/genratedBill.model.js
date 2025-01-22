module.exports = (sequelize, Sequelize) => {
    const GeneratedBill = sequelize.define('generatedBill', {
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
        zone_code: {
            type: Sequelize.STRING, // e.g., "0"
            allowNull: true,
            defaultValue: null,
        },
        customer_name: {
            type: Sequelize.STRING, // e.g., "AABID"
            allowNull: true,
            defaultValue: null,
        },
        customer_address: {
            type: Sequelize.TEXT, // e.g., "B-203 SANJAY NAGAR NAHARI KA NAKA"
            allowNull: true,
            defaultValue: null,
        },
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
        service_number: {
            type: Sequelize.STRING, // e.g., "26216"
            allowNull: true,
            defaultValue: null,
        },
        meter_status: {
            type: Sequelize.STRING, // e.g., "MT/GOV"
            allowNull: true,
            defaultValue: null,
        },
        //create owner type also (// e.g., "GOV")
        meter_number: {
            type: Sequelize.STRING, // e.g., "64877"
            allowNull: true,
            defaultValue: null,
        },
        category: {
            type: Sequelize.ENUM('Non Domestic', 'Domestic', 'Industrial'), // e.g., "Domestic"
            allowNull: true,
            defaultValue: null,
        },
        billing_month: {
            type: Sequelize.STRING, // e.g., "JUL 24""
            allowNull: true,
            defaultValue: null,
        },
        meter_size: {
            type: Sequelize.STRING, // e.g., "1/2\""
            allowNull: true,
            defaultValue: null,
        },
        billing_issue_date: {
            type: Sequelize.DATE, // e.g., "2024-07-13"
            allowNull: true,
            defaultValue: null,
        },
        //Billing Months (New Fields)
        prev_billing_month: {
            type: Sequelize.STRING, // e.g., "January"
            allowNull: true,
            defaultValue: null,
        },
        curr_billing_month: {
            type: Sequelize.STRING, // e.g., "February"
            allowNull: true,
            defaultValue: null,
        },


        // Billing Data for Each Month
        prev_billing_month_reading_date: {
            type: Sequelize.DATEONLY, // e.g., "2023-01-28"
            allowNull: true
        },
        prev_billing_month_reading: {
            type: Sequelize.INTEGER, // e.g., 630000
            allowNull: true
        },
        prev_billing_month_lastReading: {
            type: Sequelize.INTEGER, // e.g., 630000
            allowNull: true
        },
        prev_billing_month_consumption: {
            type: Sequelize.INTEGER, // e.g., 28880
            allowNull: true
        },
        // Tariff & Charges
        prev_billing_month_water_charge: {
            type: Sequelize.FLOAT, // e.g., 55.00
            allowNull: true,
            defaultValue: null,
        },
        prev_billing_month_minimum_charge: {
            type: Sequelize.FLOAT, // e.g., 55.00 comes from backend
            allowNull: true,
            defaultValue: null,
        },
        prev_billing_month_sewerage_charges: {
            type: Sequelize.FLOAT, // e.g., 11
            allowNull: true
        },
        prev_billing_month_stp_tax_charges: {
            type: Sequelize.FLOAT, // e.g., 7.15
            allowNull: true
        },
        prev_billing_month_meter_service_charges: {
            type: Sequelize.FLOAT, // e.g., 22.00
            allowNull: true
        },
        prev_billing_month_fixed_charges: {
            type: Sequelize.FLOAT, // e.g., "27.50" (average fixed charge for both months)
            allowNull: true,
            defaultValue: null,
        },
        prev_billing_month_idc_charges: {
            type: Sequelize.FLOAT, // e.g., "30.66" (average idc charge for both months)
            allowNull: true,
            defaultValue: null,
        },
        // current month 
        curr_billing_month_reading_date: {
            type: Sequelize.DATEONLY, // e.g., "2023-02-28"
            allowNull: true
        },
        curr_billing_month_reading: {
            type: Sequelize.INTEGER, // e.g., 630000
            allowNull: true
        },
        curr_billing_month_lastReading: {
            type: Sequelize.INTEGER, // e.g., 630000
            allowNull: true
        },
        curr_billing_month_consumption: {
            type: Sequelize.INTEGER, // e.g., 28880
            allowNull: true
        },
        // Tariff & Charges
        curr_billing_month_water_charge: {
            type: Sequelize.FLOAT, // e.g., 55.00
            allowNull: true,
            defaultValue: null,
        },
        curr_billing_month_minimum_charge: {
            type: Sequelize.FLOAT, // e.g., 55.00 comes from backend
            allowNull: true,
            defaultValue: null,
        },
        curr_billing_month_sewerage_charges: {
            type: Sequelize.FLOAT, // e.g., 11
            allowNull: true
        },
        curr_billing_month_stp_tax_charges: {
            type: Sequelize.FLOAT, // e.g., 7.15
            allowNull: true
        },
        curr_billing_month_meter_service_charges: {
            type: Sequelize.FLOAT, // e.g., 22.00
            allowNull: true
        },
        curr_billing_month_fixed_charges: {
            type: Sequelize.FLOAT, // e.g., "27.50" (average fixed charge for both months)
            allowNull: true,
            defaultValue: null,
        },
        curr_billing_month_idc_charges: {
            type: Sequelize.FLOAT, // e.g., "30.66" (average idc charge for both months)
            allowNull: true,
            defaultValue: null,
        },

        adjusted_consumption_amount: {
            type: Sequelize.FLOAT, // e.g., 55.00  समायोजित उपभोग राशि
            allowNull: true,
            defaultValue: null,
        },
        amount_borne_by_government_rebate: {
            type: Sequelize.FLOAT, // e.g., 55.00  सरकार द्वारा वहन की गयी राशि
            allowNull: true,
            defaultValue: null,
        },
        // Charges
        prev_billing_month_total: {
            type: Sequelize.FLOAT, // e.g., 153.31
            allowNull: true
        },
        curr_billing_month_total: {
            type: Sequelize.FLOAT, // e.g., 153.31
            allowNull: true,
            defaultValue: null,
        },

        interest_additional_Charges: {
            type: Sequelize.FLOAT, // e.g., 0.38
            allowNull: true,
            defaultValue: null,
        },
        outstanding_amount: {
            type: Sequelize.FLOAT, // e.g., 338.00
            allowNull: true,
            defaultValue: null,
        },
        total_bill: {
            type: Sequelize.FLOAT, // e.g., 645
            allowNull: true,
            defaultValue: null,
        },
        late_payment_surcharge: {
            type: Sequelize.FLOAT, // e.g., 31
            allowNull: true,
            defaultValue: null,
        },
        total_bill_after_lps: {
            type: Sequelize.FLOAT, // e.g., 676
            allowNull: true,
            defaultValue: null,
        },
        // Payment Details
        due_date_by_cheque: {
            type: Sequelize.DATEONLY, // e.g., "2024-08-02"
            allowNull: true,
            defaultValue: null,
        },
        due_date_by_cash: {
            type: Sequelize.DATEONLY, // e.g., "2024-08-05"
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
            tableName: 'generated_bill',
            timestamps: true,
            paranoid: true,
        }
    )
    // GeneratedBill.associate = (models) => {
    //     // Relationships  
    //     GeneratedBill.belongsTo(models.users, {
    //         foreignKey: 'created_by',
    //         as: 'createdBy', // Alias for createdBy relationship
    //     });
    // };
    return GeneratedBill;
};