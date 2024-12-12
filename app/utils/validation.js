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
    body('rule').notEmpty().withMessage('Meter Status Rule Is Required.'),
    body('description').notEmpty().withMessage('Meter Status Description Is Required.'),
    body('status').notEmpty().withMessage('Status Is Required.')
];

exports.slabValidation = [
    body('max_consumption').notEmpty().withMessage('Max consumption Is Required.'),
    body('min_consumption').notEmpty().withMessage('Min consumption Is Required.'),
    body('category_id').notEmpty().withMessage('Category Is Required.'),
    
];