const { Op, Sequelize } = require("sequelize");
// const con = require('./../../config/database');
const message = require('../utils/constant');
const SubcategoryModel = require('../models').Subcategory;

class Subcategory {
    createSubcategory = async (req, res) => {
        console.log('req', req.body)
        // try {
        //     const temp = {
        //         name: req?.body?.name,
        //         slug: req?.body?.slug
        //     }
        //     let data = SubcategoryModel.create(temp, {new: true});
        //     return res.status(200).json({
        //         status: true,
        //         message: message. Subcategory_Added
        //     })
        // } catch (error) {
        //     return res.status(500).json({
        //         message: message.Server_Error,
        //         status: false,
        //         error: error
        //     })
        // }
    }

    getAllSubcategory = async (req, res) => {
        console.log("hi this is display the all items",req)
        // try {
        //     let page = Number(req?.query?.page);
        //     let perPage = Number(req?.query?.perPage);
        //     let searchItem = req.query.searchItem;

        //     if(searchItem) {
        //         page = 0
        //     }
        //     if (page > 0) {
        //         page = page * perPage
        //     }
            
        //     let subcategoryList = await SubcategoryModel.findAndCountAll({
        //         offset: page,
        //         limit: perPage,
        //         where: {
        //             [Op.or]: [
        //                 {name: { [Op.like]: "%" + searchItem + "%" }},
        //                 {slug: { [Op.like]: "%" + searchItem + "%" }}
        //             ]
        //           }
                
        //     })
        //     if (!subcategoryList) {
        //         return res.status(404).json({
        //             status: false,
        //             message: message.Record_not_found
        //         });
        //     }
        //     res.status(200).json({
        //         status: true,
        //         category: subcategoryList,
        //         message: message.Data_get_successfully
        //     })
        // } catch (error) {
        //     res.status(400).json({
        //         status: false,
        //         error: error.mesage
        //     })
        // }
    }

    updateSubcategory = async (req, res) => {
        console.log('req', req.body.name)
        // try {
        //     const temp = {
        //         name: req?.body?.name,
        //         slug: req?.body?.slug
        //     }
        //     let data = await SubcategoryModel.findOne({where: { id: req?.params?.id }});
        //     if (!data) {
        //         return res.status(404).json({
        //             message: message.This_user_not_found
        //         });
        //     }
        //     var condition = { where: { id: req?.params?.id }};
        //     const subcategory = await SubcategoryModel.update(temp, condition, {new: true});
        //         return res.status(200).json({
        //             status: true,
        //             message: message. Subcategory_Updated
        //         });
        // } catch (error) {
        //     return res.status(500).json({
        //         message: message.Server_Error,
        //         status: false,
        //         error: error
        //     });
        // }
    }

    deleteSubcategory = async (req, res) => {
        // try{
        //     let data = await SubcategoryModel.findOne({ where: {id: req?.params?.id} });
        //     if (!data) {
        //         return res.status(404).json({
        //             status: false,
        //             message: message.This_user_not_found
        //         })
        //     }

        //     const deleteData = await SubcategoryModel.destroy({ where: {id: req?.params?.id} });
        //     return res.status(200).json({
        //         status: true,
        //         message: message. Subcategory_Deleted
        //     });
        // } catch (error) {
        //     return res.status(500).json({
        //         message: message.Server_Error,
        //         status: false,
        //         error: error
        //     })
        // }
    }

    getSingleSubcategory = async (req, res) => {
        // try {
        //     const singleSubcategory = await SubcategoryModel.findOne({ where: {id: req?.params?.id}})
        //     if(!singleSubcategory) {
        //         return res.status(404).json({
        //             message: message.This_user_not_found,
        //             status: false
        //         })
        //     }
        //     res.status(200).json({
        //         status: true,
        //         message: message.Data_get_successfully,
        //         data: singleSubcategory
        //     })
        // } catch (error) {
        //     return res.status(500).json({
        //         status: false,
        //         message: message.Server_Error
        //     })
        // }
    }
}

module.exports = new Subcategory();