const { validationResult } = require('express-validator');
const { Op, Sequelize, where } = require("sequelize");
const { SELECT } = require("sequelize/lib/query-types");
const message = require('../utils/constant');
// const { baEnrollValidation } = require('../utils/validation'); // Import the validation middleware
const { getPaginationAndSearch } = require('../utils/pagination');
const { sendErrorResponse, sendResponse } = require('../utils/lib'); 
const db = require("../models");
const BAEnroll =db.billingAgency;

exports.create = [
    // Use the imported validation middleware (assumes baEnrollValidation contains validation logic for all fields)
    // ...baEnrollValidation,  // Validation for the Billing Agency fields

    async (req, res) => {
        try {
            console.log('try block')
            // Check for validation errors
            const errors = validationResult(req);
            console.log('validation errors', errors)
            if (!errors.isEmpty()) {
                return sendErrorResponse({ res, err: errors.array(), status: 401 });
            }

            // Proceed with the creation logic if validation passes
            const temp = {
                pan_number: req.body.pan_number,
                tan_number: req.body.tan_number,
                gst_number: req.body.gst_number,
                cin_number: req.body.cin_number,
                company_name: req.body.company_name,
                director_name: req.body.director_name,
                authorized_signatory: req.body.authorized_signatory,
                establishment_date: req.body.establishment_date,
                nature_of_company: req.body.nature_of_company,
                annual_turnover: req.body.annual_turnover,
                contact_person_name: req.body.contact_person_name,
                contact_number: req.body.contact_number,
                registered_office_address: req.body.registered_office_address,
                office_landmark: req.body.office_landmark,
                office_area: req.body.office_area,
                office_state: req.body.office_state,
                office_district: req.body.office_district,
                office_pincode: req.body.office_pincode,
                office_landline: req.body.office_landline,
                company_website: req.body.company_website,
                email: req.body.email,
                corporate_office_address: req.body.corporate_office_address,
                corporate_landmark: req.body.corporate_landmark,
                corporate_area: req.body.corporate_area,
                corporate_state: req.body.corporate_state,
                corporate_district: req.body.corporate_district,
                corporate_pincode: req.body.corporate_pincode,
                corporate_landline: req.body.corporate_landline,
                corporate_website: req.body.corporate_website,
                corporate_email: req.body.corporate_email,
                nib_number: req.body.nib_number,
                loi_number: req.body.loi_number,
                work_order_number: req.body.work_order_number,
                work_order_effective_date: req.body.work_order_effective_date,
                work_order_expiry_date: req.body.work_order_expiry_date,
                work_order_cost: req.body.work_order_cost,
                status: req.body.status, // Active or Inactive
            };
 console.log('temp data', temp)
            // Create the Billing Agency record in the database
            const data = await BAEnroll.create(temp);

            // Return the created data
             return sendResponse({ res, data});
        } catch (err) {
            console.log('catch err', err)
            return sendErrorResponse({ res, err });
        }
    }
];

exports.update = [
    async (req, res) => {      
        try {
            // Check for validation errors
            // const errors = validationResult(req);
            // if (!errors.isEmpty()) {
            //     return sendErrorResponse({ res, err: errors.array(), status: 401 });
            // }

            // Get the billing agency ID from the request parameters
            const id = req.params.id;

            // Find the billing agency by its ID
            const billingAgency = await BAEnroll.findByPk(id);

            if (!billingAgency) {
                return sendErrorResponse({ res, msg: "Billing Agency not found", status: 404 });
            }

            // Prepare the data to update
            const data = {
                pan_number: req.body.pan_number,
                tan_number: req.body.tan_number,
                gst_number: req.body.gst_number,
                cin_number: req.body.cin_number,
                company_name: req.body.company_name,
                director_name: req.body.director_name,
                authorized_signatory: req.body.authorized_signatory,
                establishment_date: req.body.establishment_date,
                nature_of_company: req.body.nature_of_company,
                annual_turnover: req.body.annual_turnover,
                contact_person_name: req.body.contact_person_name,
                contact_number: req.body.contact_number,
                registered_office_address: req.body.registered_office_address,
                office_landmark: req.body.office_landmark,
                office_area: req.body.office_area,
                office_state: req.body.office_state,
                office_district: req.body.office_district,
                office_pincode: req.body.office_pincode,
                office_landline: req.body.office_landline,
                company_website: req.body.company_website,
                email: req.body.email,
                corporate_office_address: req.body.corporate_office_address,
                corporate_landmark: req.body.corporate_landmark,
                corporate_area: req.body.corporate_area,
                corporate_state: req.body.corporate_state,
                corporate_district: req.body.corporate_district,
                corporate_pincode: req.body.corporate_pincode,
                corporate_landline: req.body.corporate_landline,
                corporate_website: req.body.corporate_website,
                corporate_email: req.body.corporate_email,
                nib_number: req.body.nib_number,
                loi_number: req.body.loi_number,
                work_order_number: req.body.work_order_number,
                work_order_effective_date: req.body.work_order_effective_date,
                work_order_expiry_date: req.body.work_order_expiry_date,
                work_order_cost: req.body.work_order_cost,
                status: req.body.status
            };

            // Update the billing agency with the new data
            await billingAgency.update(data);

            // Fetch the updated billing agency data
            const updatedBillingAgency = await BAEnroll.findOne({
                where: { id },
                include: []  // You can add associations here if required
            });

            // Return the updated data in the response
            return sendResponse({ res, data: { billingAgency: updatedBillingAgency } });
        } catch (err) {
            // Handle any errors that occur during the process
            return sendErrorResponse({ res, err });
        }
    }
];

exports.delete = async (req, res) => {
    try {
        // Find the billing agency by its id from the URL parameters
        const id = req.params.id;
        const billingAgency = await BAEnroll.findByPk(id);

        // If the billing agency doesn't exist, return a 404 error
        if (!billingAgency) {
            return sendErrorResponse({
                res,
                msg: "Billing Agency not found",
                status: 404
            });
        }

        // Proceed to delete the billing agency
        const deleteData = await BAEnroll.destroy({ where: { id } });

        // Check if any row was deleted (deleteData will be the count of affected rows)
        if (deleteData === 0) {
            return sendErrorResponse({
                res,
                msg: "Billing Agency not deleted",
                status: 404
            });
        }

        // If deletion was successful, return a success response
        return sendResponse({
            res,
            data: { message: "Billing Agency deleted successfully" }
        });
    } catch (err) {
        // Catch any unexpected errors and return a server error response
        return sendErrorResponse({
            res,
            err,
            msg: "Server error",
            status: 500
        });
    }
};

exports.getAll = async (req, res) => {
    try {
                                      console.log('first')
        // Extract pagination and search information from the request
        const { offset, perPage, whereCondition } = getPaginationAndSearch(req, 'company_name');  // Example: search by company name

        // Fetch the list of billing agencies with pagination and search filter
        let billingAgencyList = await BAEnroll.findAndCountAll({
            offset,
            limit: perPage,
            where: whereCondition,  // Apply search filter if exists
            // Optionally, include related models if needed, like associated categories or other relations
            // include: [
            //     {
            //         model: db.relatedModel,
            //         as: 'relatedData',
            //         attributes: ['field1', 'field2']  // Specify fields to include
            //     }
            // ]
        });

        // // Check if no records are found
        // if (billingAgencyList.rows.length === 0) {
        //     return sendResponse({
        //         res,
        //         data: {
        //             message: "No billing agencies found",
        //             billingAgencies: []
        //         },
        //         status: 404
        //     });
        // }

        // Return the billing agencies list along with the total count
        return sendResponse({
            res,
            data: {
                billingAgencies: billingAgencyList.rows,  // Rename rows to billingAgencies
                count: billingAgencyList.count  // Include the total count for pagination
            }
        });
    } catch (err) {
        // Handle errors and send an appropriate error response
        return sendErrorResponse({
            res,
            err,
            msg: "Server error",
            status: 500
        });
    }
};

exports.getSingle = async (req, res) => {
    try {
        console.log("params id",req.params.id);
        // Fetch the billing agency record by its ID
        const id = req.params.id;

        const billingAgency = await BAEnroll.findOne({
            where: {
                id: id
            }
            // You can include related models here if needed, for example:
            // include: [
            //     {
            //         model: db.someRelatedModel, // Include related models (if applicable)
            //         as: 'relatedData',
            //         attributes: ['field1', 'field2'] // Specify fields to be included
            //     }
            // ]
        });

        // If no billing agency is found, return an error
        if (!billingAgency) {
            return sendErrorResponse({
                res,
                msg: "Billing Agency not found",
                status: 404
            });
        }
        // If billing agency is found, return the data
        return sendResponse({
            res,
            data: { billingAgency }
        });
    } catch (err) {
        // Catch any unexpected errors and return a server error response
        return sendErrorResponse({
            res,
            err,
            msg: "Server error",
            status: 500
        });
    }
};