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
            validate: {
                is: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/ // PAN validation pattern
            }
        },
        tan_number: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                is: /^[A-Z]{4}[0-9]{5}[A-Z]{1}$/ // TAN validation pattern
            }
        },
        gst_number: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                is: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z0-9]{1}[0-9]{1}$/ // GST validation pattern
            }
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
            validate: {
                is: /^[0-9]{10}$/ // Contact number validation
            }
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

// module.exports = (sequelize, Sequelize) => {
//     const ChargeType = sequelize.define("chargeType", {
//         id: {
//             type: Sequelize.INTEGER,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         bill_agency_pan_no: {
//             type: Sequelize.STRING
//         },
//         bill_agency_tan_no: {
//             type: Sequelize.STRING
//         },
//         bill_agency_gst_no: {
//             type: Sequelize.STRING
//         },
//         bill_agency_cin_no: {
//             type: Sequelize.INTEGER
//         },
//         bill_agency_comp_name: {
//             type: Sequelize.STRING
//         },
//         bill_agency_dir_name: {
//             type: Sequelize.STRING
//         },
//         bill_agency_auth_signatory: {
//             type: Sequelize.STRING
//         },
//         bill_agency_estd: {
//             type: Sequelize.DATE
//         },
//         bill_agency_nature_of_company: {
//             type: Sequelize.STRING
//         },
//         //add data type int or float 
//         bill_agency_turnover: {
//             type: Sequelize.STRING
//         },
//         bill_agency_contact_person_name: {
//             type: Sequelize.STRING
//         },
//         bill_agency_person_contact_no: {
//             type: Sequelize.STRING
//         },
//         bill_agency_reg_office_address: {
//             type: Sequelize.STRING
//         },
//         bill_agency_landmark: {
//             type: Sequelize.STRING
//         },
//         bill_agency_area: {
//             type: Sequelize.STRING
//         },
//         bill_agency_state: {
//             type: Sequelize.STRING
//         },
//         bill_agency_district: {
//             type: Sequelize.STRING
//         },
//         bill_agency_pincode: {
//             type: Sequelize.STRING
//         },
//         bill_agency_landline: {
//             type: Sequelize.STRING
//         },
//         bill_agency_company_website: {
//             type: Sequelize.STRING
//         },
//         bill_agency_email: {
//             type: Sequelize.STRING
//         },
//         bill_agency_corp_office_address: {
//             type: Sequelize.STRING
//         },
//         bill_agency_corp_landmark: {
//             type: Sequelize.STRING
//         },
//         bill_agency_corp_area: {
//             type: Sequelize.STRING
//         },
//         bill_agency_corp_state: {
//             type: Sequelize.STRING
//         },
//         bill_agency_corp_district: {
//             type: Sequelize.STRING
//         },
//         bill_agency_corp_pincode: {
//             type: Sequelize.STRING
//         },
//         bill_agency_corp_landline: {
//             type: Sequelize.STRING
//         },
//         bill_agency_corp_company_website: {
//             type: Sequelize.STRING
//         },
//         bill_agency_corp_email: {
//             type: Sequelize.STRING
//         },
//         bill_agency_nib_no: {
//             type: Sequelize.STRING
//         },
//         bill_agency_loi_no: {
//             type: Sequelize.STRING
//         },
//         bill_agency_work_order_no: {
//             type: Sequelize.STRING
//         },
//         bill_agency_work_order_eff_date: {
//             type: Sequelize.STRING
//         },
//         bill_agency_work_order_exp_date: {
//             type: Sequelize.STRING
//         },
//         bill_agency_work_order_cost: {
//             type: Sequelize.STRING
//         },
//         status: {
//             type: Sequelize.INTEGER
//         },
//     }, {
//         tableName: 'charge_type', // table name in the database
//         timestamps: true,           // automatically adds createdAt, updatedAt fields
//         paranoid: true              // adds deletedAt for soft deletes
//     });

//     return ChargeType;
// };