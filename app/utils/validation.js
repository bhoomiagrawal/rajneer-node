const { body } = require('express-validator');


exports.categoryValidation = [
    body('category_name').notEmpty().withMessage('Category Name Is Required.'),
    body('category_code').notEmpty().withMessage('Category Code Is Required.')
];

exports.subcategoryValidation = [
    body('category_id').notEmpty().withMessage('Category ID is required.')
        .isInt({ min: 1 }).withMessage('Category ID must be a valid positive integer.'),
    body('subcategory_name').notEmpty().withMessage('Subcategory name is required.')
        .isLength({ min: 3 }).withMessage('Subcategory name must be at least 3 characters long.')
];

exports.connectionSizeValidation = [
    body('size').notEmpty().withMessage('Connection size is required.')   // Ensures size is not empty
        .isString().withMessage('Connection size must be a string.') // Ensures size is a string
];

exports.meterServiceChargeValidation = [
    body('connection_size_id').notEmpty().withMessage('Connection Size ID is required.')
        .isInt().withMessage('Connection Size ID must be an integer.'),
    body('meter_service_charge').notEmpty().withMessage('Meter Service Charge is required.')
        .isString().withMessage('Meter Service Charge must be a string.'),
    body('status').notEmpty().withMessage('Status is required.')
        .isInt().withMessage('Status must be an integer.')
];

exports.meterStatusValidation = [
    body('meter_status').notEmpty().withMessage('Meter Status is required.')
        .isString().withMessage('Meter Status must be a string.'),
    body('description').notEmpty().withMessage('Meter Status Description is required.')
        .isString().withMessage('Description must be a string.'),
    body('status').notEmpty().withMessage('Status is required.')
        .isInt().withMessage('Status must be an integer.')
];

exports.connectionTypeValidation = [
    body('conn_type').notEmpty().withMessage('Connection Type is required.')
        .isString().withMessage('Connection Type must be a string.'),
    body('description').notEmpty().withMessage('Description is required.')
        .isString().withMessage('Description must be a string.'),
    body('status').notEmpty().withMessage('Status is required.')
        .isInt().withMessage('Status must be an integer.')
];

exports.chargeTypeValidation = [
    body('charge_name').notEmpty().withMessage('Charge Type Is Required.'),
    // body('status').notEmpty().withMessage('Status Is Required.')
];

exports.slabValidation = [
    body('max_consumption').notEmpty().withMessage('Max consumption Is Required.'),
    body('min_consumption').notEmpty().withMessage('Min consumption Is Required.'),
    body('category_id').notEmpty().withMessage('Category Is Required.'),

];

exports.baEnrollValidation = [
    body('pan_number') // Corresponds to "pan_number" in the Sequelize model
        .notEmpty().withMessage('Pan No Is Required.')
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/).withMessage('Invalid PAN Number format.'),

    body('tan_number') // Corresponds to "tan_number" in the Sequelize model
        .notEmpty().withMessage('Tan No Is Required.')
        .matches(/^[A-Z]{4}[0-9]{5}[A-Z]{1}$/).withMessage('Invalid TAN Number format.'),

    body('gst_number') // Corresponds to "gst_number" in the Sequelize model
        .notEmpty().withMessage('GST No Required.')
        .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z0-9]{1}[0-9]{1}$/).withMessage('Invalid GST Number format.'),

    body('cin_number') // Corresponds to "cin_number" in the Sequelize model
        .notEmpty().withMessage('CIN Required.'),

    body('company_name') // Corresponds to "company_name" in the Sequelize model
        .notEmpty().withMessage('Company Name Required.'),

    body('director_name') // Corresponds to "director_name" in the Sequelize model
        .notEmpty().withMessage('Director Name Is Required.'),

    body('authorized_signatory') // Corresponds to "authorized_signatory" in the Sequelize model
        .notEmpty().withMessage('Authorized Signatory Is Required.'),

    body('establishment_date') // Corresponds to "establishment_date" in the Sequelize model
        .notEmpty().withMessage('Date of Establishment Is Required.')
        .isDate().withMessage('Invalid Date format for Establishment Date.'),

    body('nature_of_company') // Corresponds to "nature_of_company" in the Sequelize model
        .notEmpty().withMessage('Nature of Company Is Required.'),

    body('annual_turnover') // Corresponds to "annual_turnover" in the Sequelize model
        .notEmpty().withMessage('Turn Over Is Required.')
        .isFloat().withMessage('Turnover must be a valid number.'),

    body('contact_person_name') // Corresponds to "contact_person_name" in the Sequelize model
        .notEmpty().withMessage('Contact Person Name Is Required.'),

    body('contact_number') // Corresponds to "contact_number" in the Sequelize model
        .notEmpty().withMessage('Person Contact No Is Required.')
        .matches(/^[0-9]{10}$/).withMessage('Invalid contact number format. Must be 10 digits.'),

    body('registered_office_address') // Corresponds to "registered_office_address" in the Sequelize model
        .notEmpty().withMessage('Registered Office Address Is Required.'),

    body('office_landmark') // Corresponds to "office_landmark" in the Sequelize model
        .notEmpty().withMessage('Nearest Landmark Is Required.'),

    body('office_area') // Corresponds to "office_area" in the Sequelize model
        .notEmpty().withMessage('Area Is Required.'),

    body('office_state') // Corresponds to "office_state" in the Sequelize model
        .notEmpty().withMessage('State Is Required.'),

    body('office_district') // Corresponds to "office_district" in the Sequelize model
        .notEmpty().withMessage('District Is Required.'),

    body('office_pincode') // Corresponds to "office_pincode" in the Sequelize model
        .notEmpty().withMessage('Pincode Is Required.')
        .matches(/^[0-9]{6}$/).withMessage('Invalid Pincode format.'),

    body('office_landline') // Corresponds to "office_landline" in the Sequelize model
        .notEmpty().withMessage('STD Code-Landline No Is Required.')
        .matches(/^[0-9]{10,12}$/).withMessage('Invalid Landline number format.'),

    body('company_website') // Corresponds to "company_website" in the Sequelize model
        .notEmpty().withMessage('Company WebSite Is Required.')
        .isURL().withMessage('Invalid URL format.'),

    body('email') // Corresponds to "email" in the Sequelize model
        .notEmpty().withMessage('E-Mail ID Is Required.')
        .isEmail().withMessage('Invalid Email format.'),

    body('corporate_office_address') // Corresponds to "corporate_office_address" in the Sequelize model
        .notEmpty().withMessage('Corporate Office Address Is Required.'),

    body('corporate_landmark') // Corresponds to "corporate_landmark" in the Sequelize model
        .notEmpty().withMessage('Nearest Landmark Is Required.'),

    body('corporate_area') // Corresponds to "corporate_area" in the Sequelize model
        .notEmpty().withMessage('Corporate Area Is Required.'),

    body('corporate_state') // Corresponds to "corporate_state" in the Sequelize model
        .notEmpty().withMessage('Corporate State Is Required.'),

    body('corporate_district') // Corresponds to "corporate_district" in the Sequelize model
        .notEmpty().withMessage('Corporate District Is Required.'),

    body('corporate_pincode') // Corresponds to "corporate_pincode" in the Sequelize model
        .notEmpty().withMessage('Corporate Pincode Is Required.')
        .matches(/^[0-9]{6}$/).withMessage('Invalid Corporate Pincode format.'),

    body('corporate_landline') // Corresponds to "corporate_landline" in the Sequelize model
        .notEmpty().withMessage('Corporate STD Code-Landline No Is Required.')
        .matches(/^[0-9]{10,12}$/).withMessage('Invalid Corporate Landline number format.'),

    body('corporate_website') // Corresponds to "corporate_website" in the Sequelize model
        .notEmpty().withMessage('Corporate Company WebSite Is Required.')
        .isURL().withMessage('Invalid Corporate URL format.'),

    body('corporate_email') // Corresponds to "corporate_email" in the Sequelize model
        .notEmpty().withMessage('Corporate E-Mail ID Is Required.')
        .isEmail().withMessage('Invalid Corporate Email format.'),

    body('nib_number') // Corresponds to "nib_number" in the Sequelize model
        .notEmpty().withMessage('NIB Number Is Required.'),

    body('loi_number') // Corresponds to "loi_number" in the Sequelize model
        .notEmpty().withMessage('LOI Number Is Required.'),

    body('work_order_number') // Corresponds to "work_order_number" in the Sequelize model
        .notEmpty().withMessage('Work Order Number Is Required.'),

    body('work_order_effective_date') // Corresponds to "work_order_effective_date" in the Sequelize model
        .notEmpty().withMessage('Work Order Effective Date Is Required.')
        .isDate().withMessage('Invalid Work Order Effective Date format.'),

    body('work_order_expiry_date') // Corresponds to "work_order_expiry_date" in the Sequelize model
        .notEmpty().withMessage('Work Order Expiry Date Is Required.')
        .isDate().withMessage('Invalid Work Order Expiry Date format.'),

    body('work_order_cost') // Corresponds to "work_order_cost" in the Sequelize model
        .notEmpty().withMessage('Work Order Cost Is Required.')
        .isFloat().withMessage('Work Order Cost must be a valid number.'),

    body('status') // Corresponds to "status" in the Sequelize model
        .notEmpty().withMessage('Status Is Required.')
        .isInt().withMessage('Status must be an integer.')
    //     // body('bill_agency_address_flag').notEmpty().withMessage('Category Is Required.'),
    //     // body('bill_agency_delete_flag').notEmpty().withMessage('Category Is Required.'),
    //     // body('bill_agency_created_by').notEmpty().withMessage('Category Is Required.'),
    //     // body('bill_agency_updated_by').notEmpty().withMessage('Category Is Required.'),  
];

exports.binderValidation = [
    // body('max_consumption').notEmpty().withMessage('Max consumption Is Required.'),
    // body('min_consumption').notEmpty().withMessage('Min consumption Is Required.'),
    // body('category_id').notEmpty().withMessage('Category Is Required.'),

];

exports.tariffValidation = [
  body("charge_type_id")
    .exists().withMessage("Charge type is required.")
    .isIn(["water_charge", "meter_service", "fixed_charge", "minimum_charge"])
    .withMessage("Invalid charge type."),
  // body("connection_size_id")
  //   .if(body("charge_type").not().equals("fixed_charge"))
  //   .exists().withMessage("Connection size ID is required.")
  //   .isInt().withMessage("Connection size ID must be an integer."),
  // body("slab_id")
  //   .if(body("charge_type").isIn(["water_charge", "minimum_charge"]))
  //   .exists().withMessage("Slab ID is required for the selected charge type.")
  //   .isInt().withMessage("Slab ID must be an integer."),
  body("ratePerThousand")
    .exists().withMessage("Rate is required.")
    .isFloat({ min: 0 }).withMessage("Rate must be a positive number."),
  body("sso_id")
    .exists().withMessage("SSO ID is required.")
    .isInt().withMessage("SSO ID must be an integer."),
];

