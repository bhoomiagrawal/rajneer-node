const { validationResult } = require("express-validator");
const {ownerTypeValidation} = require('../utils/validation');
const message = require('../utils/constant');
const { getPaginationAndSearch } = require('../utils/pagination');
const { SELECT } = require("sequelize/lib/query-types");
const { sendResponse, sendErrorResponse } = require("../utils/lib");
const db = require("../models");
const OwnerTypeModel = db.ownertype;


exports.create = [
    // Use the imported validation middleware
    ...ownerTypeValidation,
    async (req, res) => {
        try {
            console.log("try block request value is :---->", req.body.owner_type_name)
          // Check for validation errors
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
              return sendErrorResponse({ res, err: errors.array(), status: 401 })
          }
          const temp = {
              owner_type_name: req?.body?.owner_type_name
          }
          let data = await OwnerTypeModel.create(temp, { new: true });
          console.log("stored data is :----->",data);
          return sendResponse({ res, data })
        } catch (err) {
            console.log("catch block of create",err);
           return sendErrorResponse({res,err})
        }
    }
];

exports.update = [
    async (req, res) => {
        try {
            const data = {
                owner_type_name: req?.body?.owner_type_name,
                status: req.body.status
            }
            const ownerType = await OwnerTypeModel.findByPk(id);
            if (!ownerType) {
                return sendErrorResponse({ res, msg: message.ownerType_not_found, status: 404 })
            }
            // Update the ownerType with the new fields
            await ownerType.update(data);
            const updatedownerType = await OwnerTypeModel.findOne({
                where: {
                    id
                },
            });
            return sendResponse({ res, data: { ownerType: updatedownerType } })
        } catch (err) {
            return sendErrorResponse({ res, err })
        }
    }
]


// exports.delete = async (req, res) => {
//     try{
//         const binderData = await BinderModel.findByPk(req?.params?.id);
//         if (!binderData) {
//             return sendErrorResponse({
//                 res,
//                 msg:message.binder_not_found,
//                 status:404
//             })
//         }
//         const deleteData = await BinderModel.destroy({ where: {id: req?.params?.id} });
//          // Check if any row was deleted (deleteData will be the count of affected rows)
//          if (deleteData === 0) {
//             return sendErrorResponse({ res, msg: message.binder_not_deleted })
//         }
//         // If deletion was successful, return a success response
//         return sendResponse({res,data:{message:message.binder_Deleted}});
//     } catch (err) {
//         return sendErrorResponse({res,err});
//     }
// }

// exports.getSingle = async (req, res) => {
//     try {
//         const id= req.params.id;
//         const binderData = await BinderModel.findByPk(id);
//         if (!binderData) {
//             return sendErrorResponse({
//                 res, msg: message.binder_not_found,status:400
//               })
//         }
//         return sendResponse({
//             res, data: {binderData,message:message.Data_get_successfully}
//           })
//     } catch (err) {
//         return sendErrorResponse({res,err})
//     }
// }

// exports.getAll = async (req, res) => {
//     try {
//         // Use the helper to extract pagination and search information for the specific field ('Connection_Size')
//         const { offset, perPage, whereCondition } = getPaginationAndSearch(req, 'binder_name');  // Pass the field for search
//         // Fetch the connection size list with pagination and search filter
//         let binderModelList = await BinderModel.findAndCountAll({
//             offset,
//             limit: perPage,
//             where: whereCondition,  // Apply search filter if exists
//         });
//         const totalPages = binderModelList.count > 0 ? Math.ceil(binderModelList.count / perPage) : 0;
//         // if (!binderModelList) {
//         //     return sendErrorResponse({
//         //         res,
//         //         msg:message.Record_not_found,
//         //         status:404
//         //     })
//         // }
//  // Return the modified response with status and message inside subCategory object
//  return sendResponse({
//     res, 
//     // data:{
//     //     binderModel: binderModelList.rows,  // Rename rows to data
//     //     count: binderModelList.count  // Include the total count
//     // }
//     data: {
//         binder: binderModelList.rows,  // Rename rows to subCategory data
//         count: binderModelList.count,   // Include the total count for pagination
//         totalPages: totalPages, // Calculate total pages
//         currentPage: req.query.page || 1, // Current page based on the request
//         pageSize: perPage, // Number of items per page
//     }
// })        
//     } catch (err) {
//         console.log("errerrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",err)
//        return sendErrorResponse({res,err})
//     }
// };