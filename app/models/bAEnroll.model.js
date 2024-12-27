module.exports = (sequelize, Sequelize) => {
    const BillingAgency = sequelize.define("billingAgency", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pan_number: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            // validate: {
            //     is: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/ // PAN validation pattern
            // }
        },
        tan_number: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            // validate: {
            //     is: /^[A-Z]{4}[0-9]{5}[A-Z]{1}$/ // TAN validation pattern
            // }
        },
        gst_number: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            // validate: {
            //     is: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z0-9]{1}[0-9]{1}$/ // GST validation pattern
            // }
        },
        cin_number: {
            type: Sequelize.STRING,
            allowNull: false
        },
        company_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        director_name: {
            type: Sequelize.STRING
        },
        authorized_signatory: {
            type: Sequelize.STRING
        },
        establishment_date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        nature_of_company: {
            type: Sequelize.STRING
        },
        annual_turnover: {
            type: Sequelize.FLOAT, // Adjusted to float for turnover
            allowNull: true
        },
        contact_person_name: {
            type: Sequelize.STRING
        },
        contact_number: {
            type: Sequelize.STRING,
            // validate: {
            //     is: /^[0-9]{10}$/ // Contact number validation
            // }
        },
        registered_office_address: {
            type: Sequelize.STRING
        },
        office_landmark: {
            type: Sequelize.STRING
        },
        office_area: {
            type: Sequelize.STRING
        },
        office_state: {
            type: Sequelize.STRING
        },
        office_district: {
            type: Sequelize.STRING
        },
        office_pincode: {
            type: Sequelize.STRING
        },
        office_landline: {
            type: Sequelize.STRING
        },
        company_website: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        corporate_office_address: {
            type: Sequelize.STRING
        },
        corporate_landmark: {
            type: Sequelize.STRING
        },
        corporate_area: {
            type: Sequelize.STRING
        },
        corporate_state: {
            type: Sequelize.STRING
        },
        corporate_district: {
            type: Sequelize.STRING
        },
        corporate_pincode: {
            type: Sequelize.STRING
        },
        corporate_landline: {
            type: Sequelize.STRING
        },
        corporate_website: {
            type: Sequelize.STRING
        },
        corporate_email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        nib_number: {
            type: Sequelize.STRING
        },
        loi_number: {
            type: Sequelize.STRING
        },
        work_order_number: {
            type: Sequelize.STRING
        },
        work_order_effective_date: {
            type: Sequelize.DATE
        },
        work_order_expiry_date: {
            type: Sequelize.DATE
        },
        work_order_cost: {
            type: Sequelize.FLOAT // Adjusted to float for cost
        },
        status: {
            type: Sequelize.INTEGER, // Active (1) / Inactive (0)
            allowNull: false,
            defaultValue: 1
        },
        
    }, {
        tableName: 'billing_agencies', // table name in the database
        timestamps: true,              // automatically adds createdAt, updatedAt fields
        paranoid: true                 // adds deletedAt for soft deletes
    });

    return BillingAgency;
};

