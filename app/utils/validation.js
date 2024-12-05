const {body} = require('express-validator');


exports.subcategoryValidation = [
    body('category_id').notEmpty().withMessage('Category ID is required.'),
    body('subcategory_name').notEmpty().withMessage('Subcategory is required.')
];
exports.connectionSizeValidation = [
    body('Connection_Size').notEmpty().withMessage('Connection Size is required.')
];

exports.meterServiceChargeValidation = [
    body('connectionSize_id').notEmpty().withMessage('Connection Size ID is required.'),
    body('meter_service').notEmpty().withMessage('Meter Service is required.'),
    body('status').notEmpty().withMessage('Status is required.')
];