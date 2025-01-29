const { validationResult } = require("express-validator");
const {binderValidation} = require('../utils/validation');
const message = require('../utils/constant');
const { getPaginationAndSearch } = require('../utils/pagination');
const { SELECT } = require("sequelize/lib/query-types");
const { sendResponse, sendErrorResponse } = require("../utils/lib");
const db = require("../models");
const BinderModel = db.binder;


exports.create = [
    // Use the imported validation middleware
    // ...binderValidation,
    async (req, res) => {
        try {
            // // Check for validation errors
            // const errors = validationResult(req);
            // if (!errors.isEmpty()) {
            //     return sendErrorResponse({res, err:errors.array(), status:401})            
            // }
            /*
            //addintional code 
            // const subdivisionData = await subdivision.findByPk( req.body.subdivision_id);
            // if (!subdivisionData) {
            //     return sendErrorResponse({res,msg: "subdivision not found", status:404})
            // }
            // const chowkdiData = await chowkdi.findByPk( req?.body?.chowkdi_id);
            // if (!chowkdiData) {
            //     return sendErrorResponse({res,msg: "Chowkdi not found", status:404})
            // }
            */
            // Proceed with the creation logic if validation passes  SequelizeDatabaseError:{code: 'ER_BAD_FIELD_ERROR'}
            const temp = {
                subdivision_id: req.body.subdivision_id,
                chowkdi_id: req.body.chowkdi_id,
                binder_name: req.body.binder_name,
                binder_code: req.body.binder_code,
                created_by: req.body.created_by,
                updated_by: req.body.updated_by,
                status: req.body.status,
            };
            // console.log('temp data', temp )
            const data1= await BinderModel.findAll();
            console.log('data1', data1 )
            let data = await BinderModel.create(temp, { new: true });
            return sendResponse({res, data})  
        } catch (err) {
            console.log("catch block of create",err);
           return sendErrorResponse({res,err})
        }
    }
];

exports.update = [
    // ...connectionSizeValidation,
    async (req, res) => {   
        try {
            // Check for validation errors
            //  const errors = validationResult(req);
            //  if (!errors.isEmpty()) {
            //      return sendErrorResponse({res, err:errors.array(), status:401})
            //  }
            const id = req.params.id;
            /*
            //addintional code 
            // const subdivisionData = await subdivision.findByPk( req.body.subdivision_id);
            // if (!subdivisionData) {
            //     return sendErrorResponse({res,msg: "subdivision not found", status:404})
            // }
            // const chowkdiData = await chowkdi.findByPk( req?.body?.chowkdi_id);
            // if (!chowkdiData) {
            //     return sendErrorResponse({res,msg: "Chowkdi not found", status:404})
            // }
            */
            const data = {
                subdivision_id: req.body.subdivision_id,
                chowkdi_id: req.body.chowkdi_id,
                binder_name: req.body.binder_name,
                binder_code: req.body.binder_code,
                created_by: req.body.created_by,
                updated_by: req.body.updated_by,
                status: req.body.status,
            };
            const binderData = await BinderModel.findByPk(id);
            if (!binderData) {
                return sendErrorResponse({res,msg:message.binder_not_found,status:404})
            }
            // Update the connectionSize with the new fields
            await binderData.update(data);
            const updatedbinder = await BinderModel.findByPk(id);                         
            return sendResponse({res,data: {binder: updatedbinder,message: message.binder_Updated}})
        } catch (err) {
            console.log('err', err)
            return sendErrorResponse({res,err})
        }
    }
]

exports.delete = async (req, res) => {
    try{
        const binderData = await BinderModel.findByPk(req?.params?.id);
        if (!binderData) {
            return sendErrorResponse({
                res,
                msg:message.binder_not_found,
                status:404
            })
        }
        const deleteData = await BinderModel.destroy({ where: {id: req?.params?.id} });
         // Check if any row was deleted (deleteData will be the count of affected rows)
         if (deleteData === 0) {
            return sendErrorResponse({ res, msg: message.binder_not_deleted })
        }
        // If deletion was successful, return a success response
        return sendResponse({res,data:{message:message.binder_Deleted}});
    } catch (err) {
        return sendErrorResponse({res,err});
    }
}

exports.getSingle = async (req, res) => {
    try {
        const id= req.params.id;
        const binderData = await BinderModel.findByPk(id);
        if (!binderData) {
            return sendErrorResponse({
                res, msg: message.binder_not_found,status:400
              })
        }
        return sendResponse({
            res, data: {binderData,message:message.Data_get_successfully}
          })
    } catch (err) {
        return sendErrorResponse({res,err})
    }
}

exports.getAll = async (req, res) => {
    try {
        // Use the helper to extract pagination and search information for the specific field ('Connection_Size')
        const { offset, perPage, whereCondition } = getPaginationAndSearch(req, 'binder_name');  // Pass the field for search
        // Fetch the connection size list with pagination and search filter
        let binderModelList = await BinderModel.findAndCountAll({
            offset,
            limit: perPage,
            where: whereCondition,  // Apply search filter if exists
        });
        const totalPages = binderModelList.count > 0 ? Math.ceil(binderModelList.count / perPage) : 0;
        // if (!binderModelList) {
        //     return sendErrorResponse({
        //         res,
        //         msg:message.Record_not_found,
        //         status:404
        //     })
        // }
 // Return the modified response with status and message inside subCategory object
 return sendResponse({
    res, 
    // data:{
    //     binderModel: binderModelList.rows,  // Rename rows to data
    //     count: binderModelList.count  // Include the total count
    // }
    data: {
        binder: binderModelList.rows,  // Rename rows to subCategory data
        count: binderModelList.count,   // Include the total count for pagination
        totalPages: totalPages, // Calculate total pages
        currentPage: req.query.page || 1, // Current page based on the request
        pageSize: perPage, // Number of items per page
    }
})        
    } catch (err) {
        console.log("errerrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",err)
       return sendErrorResponse({res,err})
    }
};
