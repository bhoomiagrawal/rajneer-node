const { Op, Sequelize } = require("sequelize");
// const con = require('./../../config/database');
const message = require('../utils/constant');
const { SELECT } = require("sequelize/lib/query-types");
const consumptionsSizes = require('../models').connectionSize


class connectionSize {
    create = async (req, res) => {
        try {
            console.log('req', req.body)
            // const temp = {
            //     category_id:req?.body?.category_id,
            //     name: req?.body?.name,
            // }
            // console.log('temp', temp)
            // let data = consumptionsSizes.create(temp, {new: true});
            // return res.status(200).json({
            //     status: true,
            //     message: message. Subcategory_Added
            // })
        } catch (error) {
            console.log(error,"error")
            return res.status(500).json({
                message: message.Server_Error,
                status: false,
                error: error
            })
        }
    }

    getAll = async (req, res) => {
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
            
        //     let subcategoryList = await consumptionsSizes.findAndCountAll({
        //         offset: page,
        //         limit: perPage,
        //         where: {
        //             [Op.or]: [
        //                 {name: { [Op.like]: "%" + searchItem + "%" }},
        //                 {slug: { [Op.like]: "%" + searchItem + "%" }}
        //             ]
        //           }
                
        //     })
        //     if (!consumptionsSizesList) {
        //         return res.status(404).json({
        //             status: false,
        //             message: message.Record_not_found
        //         });
        //     }
        //     res.status(200).json({
        //         status: true,
        //         category: consumptionsSizesList,
        //         message: message.Data_get_successfully
        //     })
        // } catch (error) {
        //     res.status(400).json({
        //         status: false,
        //         error: error.mesage
        //     })
        // }
    }

    update = async (req, res) => {
        console.log('req', req.body.name)
        // try {
        //     const temp = {
        //         name: req?.body?.name,
        //         slug: req?.body?.slug
        //     }
        //     let data = await consumptionsSizes.findOne({where: { id: req?.params?.id }});
        //     if (!data) {
        //         return res.status(404).json({
        //             message: message.This_user_not_found
        //         });
        //     }
        //     var condition = { where: { id: req?.params?.id }};
        //     const consumption = await consumptionsSizes.update(temp, condition, {new: true});
        //         return res.status(200).json({
        //             status: true,
        //             message: message. consumption_Updated
        //         });
        // } catch (error) {
        //     return res.status(500).json({
        //         message: message.Server_Error,
        //         status: false,
        //         error: error
        //     });
        // }
    }

    delete = async (req, res) => {
        // try{
        //     let data = await consumptionsSizes.findOne({ where: {id: req?.params?.id} });
        //     if (!data) {
        //         return res.status(404).json({
        //             status: false,
        //             message: message.This_user_not_found
        //         })
        //     }

        //     const deleteData = await consumptionsSizes.destroy({ where: {id: req?.params?.id} });
        //     return res.status(200).json({
        //         status: true,
        //         message: message. consumptionsSizes_Deleted
        //     });
        // } catch (error) {
        //     return res.status(500).json({
        //         message: message.Server_Error,
        //         status: false,
        //         error: error
        //     })
        // }
    }
    // // Delete all Categories from the database.
    // deleteAll = (req, res) => {
    // consumptionsSizes.destroy({
    //   where: {},
    //   truncate: false
    // })
    //   .then(nums => {
    //     res.send({ message: `${nums} Subcategories were deleted successfully!` });
    //   })
    //   .catch(err => {
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occurred while removing all Subcategories."
    //     });
    //   });
    // };

    getSingle = async (req, res) => {
        // try {
        //     const singleConsumption = await consumptionsSizes.findOne({ where: {id: req?.params?.id}})
        //     if(!singleConsumption) {
        //         return res.status(404).json({
        //             message: message.This_user_not_found,
        //             status: false
        //         })
        //     }
        //     res.status(200).json({
        //         status: true,
        //         message: message.Data_get_successfully,
        //         data: singleConsumption
        //     })
        // } catch (error) {
        //     return res.status(500).json({
        //         status: false,
        //         message: message.Server_Error
        //     })
        // }
    }
}

module.exports = new connectionSize();