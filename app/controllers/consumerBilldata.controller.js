const db = require("../models");
const ConsumerData = db.consumerData;
const ConsumerBillData = db.consumerBillData;

const { sendErrorResponse, sendResponse } = require("../utils/lib");


// exports.create = [
//     // Use the imported validation middleware
//     ...categoryValidation,
//   async (req, res) => {

//     // Create a Category

//     try {
//       const { category_name, category_code } = req.body

//       // Check for validation errors
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return sendErrorResponse({ res, err: errors.array(), status: 401 })
//       }
//       let data = await Category.create({ category_name, category_code }, { new: true });
//       return sendResponse({ res, data })
//     } catch (err) {
//       console.log('err', err)
//       return sendErrorResponse({ res, err })
//     }
//   }
// ]

// Create and Save a Consumer
exports.create = [ async(req,res)=>{

    try{
        console.log("try block ",req.body);
        // return sendResponse({ res, data })
    } catch(err) {
        return sendErrorResponse({res,err})
    }

}]
