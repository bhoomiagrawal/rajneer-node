const {body} = require('express-validator');


exports.categoryValidation = [
    body('category_name').notEmpty().withMessage('Category Name Is Required.'),
    body('category_code').notEmpty().withMessage('Category Code Is Required.')
];


exports.subcategoryValidation = [
    body('category_id').notEmpty().withMessage('Category ID Is Required.'),
    body('subcategory_name').notEmpty().withMessage('Subcategory Is Required.')
];
exports.connectionSizeValidation = [
    body('size').notEmpty().withMessage('Connection Size Is Required.')
];

exports.meterServiceChargeValidation = [
    body('connectionSize_id').notEmpty().withMessage('Connection Size ID Is Required.'),
    body('meter_service').notEmpty().withMessage('Meter Service Is Required.'),
    body('status').notEmpty().withMessage('Status Is Required.')
];
exports.meterStatusValidation = [
    body('meter_status').notEmpty().withMessage('Meter Status Is Required.'),
    // body('rule').notEmpty().withMessage('Meter Status Rule Is Required.'),
    body('description').notEmpty().withMessage('Meter Status Description Is Required.'),
    body('status').notEmpty().withMessage('Status Is Required.')
];
exports.connectionTypeValidation = [
    body('conn_type').notEmpty().withMessage('Connection Type Is Required.'),
    body('description').notEmpty().withMessage('Description Is Required.'),
    body('status').notEmpty().withMessage('Status Is Required.')
];
exports.chargeTypeValidation = [
    body('charge_name').notEmpty().withMessage('Charge Type Is Required.'),
    body('status').notEmpty().withMessage('Status Is Required.')
];
exports.slabValidation = [
    body('max_consumption').notEmpty().withMessage('Max consumption Is Required.'),
    body('min_consumption').notEmpty().withMessage('Min consumption Is Required.'),
    body('category_id').notEmpty().withMessage('Category Is Required.'),
    
];
exports.baEnrollValidation = [
    body('bill_agency_pan_no').notEmpty().withMessage('Pan No Is Required.'),
    body('bill_agency_tan_no').notEmpty().withMessage('Tan No Is Required.'),
    body('bill_agency_gst_no').notEmpty().withMessage('GST No Required.'),
    body('bill_agency_cin_no').notEmpty().withMessage('CIN Required.'),
    body('bill_agency_comp_name').notEmpty().withMessage('Company Name Required.'),
    body('bill_agency_dir_name').notEmpty().withMessage('Director Name Is Required.'),
    body('bill_agency_auth_signatory').notEmpty().withMessage('Authorized Signatory Is Required.'),
    body('bill_agency_estd').notEmpty().withMessage('Date of Establishment Is Required.'),
    body('bill_agency_nature_of_company').notEmpty().withMessage('Nature of Company Is Required.'),
    body('bill_agency_turnover').notEmpty().withMessage('Turn Over Is Required.'),
    body('bill_agency_contact_person_name').notEmpty().withMessage('Contact Person Name Is Required.'),
    body('bill_agency_person_contact_no').notEmpty().withMessage('Person Contact No Is Required.'),
    body('bill_agency_reg_office_address').notEmpty().withMessage('Registered Office Address Is Required.'),
    body('bill_agency_landmark').notEmpty().withMessage('Nearest Landmark Is Required.'),
    body('bill_agency_area').notEmpty().withMessage('Area Is Required.'),
    body('bill_agency_state').notEmpty().withMessage('State Is Required.'),
    body('bill_agency_district').notEmpty().withMessage('District Is Required.'),
    body('bill_agency_pincode').notEmpty().withMessage('Pincode Is Required.'),
    body('bill_agency_landline').notEmpty().withMessage('STD Code-Landline No Is Required.'),
    body('bill_agency_company_website').notEmpty().withMessage('Company WebSite Is Required.'),
    body('bill_agency_email').notEmpty().withMessage('E-Mail ID Is Required.'),
    body('bill_agency_corp_office_address').notEmpty().withMessage('Corporate Office Address Is Required.'),
    body('bill_agency_corp_landmark').notEmpty().withMessage('Nearest Landmark Is Required.'),
    body('bill_agency_corp_area').notEmpty().withMessage('Corporate Area Is Required.'),
    body('bill_agency_corp_state').notEmpty().withMessage('Corporate State Is Required.'),
    body('bill_agency_corp_district').notEmpty().withMessage('Corporate District Is Required.'),
    body('bill_agency_corp_pincode').notEmpty().withMessage('Corporate Pincode Is Required.'),
    body('bill_agency_corp_landline').notEmpty().withMessage('Corporate STD Code-Landline No Is Required.'),
    body('bill_agency_corp_company_website').notEmpty().withMessage('Corporate Company WebSite Is Required.'),
    body('bill_agency_corp_email').notEmpty().withMessage('Corporate E-Mail ID Is Required.'),
    body('bill_agency_nib_no').notEmpty().withMessage('NIB Number Is Required.'),
    body('bill_agency_loi_no').notEmpty().withMessage('LOI Number Is Required.'),
    body('bill_agency_work_order_no').notEmpty().withMessage('Work Order Number Is Required.'),
    body('bill_agency_work_order_eff_date').notEmpty().withMessage('Work Order Effective Date Is Required.'),
    body('bill_agency_work_order_exp_date').notEmpty().withMessage('Work Order Expiry Date Is Required.'),
    body('bill_agency_work_order_cost').notEmpty().withMessage('Work Order Cost Is Required.'),
    body('bill_agency_status').notEmpty().withMessage('Status Is Required.'),
    // body('bill_agency_address_flag').notEmpty().withMessage('Category Is Required.'),
    // body('bill_agency_delete_flag').notEmpty().withMessage('Category Is Required.'),
    // body('bill_agency_created_by').notEmpty().withMessage('Category Is Required.'),
    // body('bill_agency_updated_by').notEmpty().withMessage('Category Is Required.'),  
];