const filterModel = require('../models/filterModel')

const filterControllerGet = async (req, res, next) => {
    try {
        const { first_name, last_name, email, gender, sort, select } = req.query
        const queryObject = {}
        const pages = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        const skipPage = (pages - 1) * limit


        if (first_name) {
            queryObject.first_name = { $regex: first_name, $options: "i" }
        }
        if (gender) {
            queryObject.gender = { $regex: gender, $options: "i" }
        }

        if (last_name) {
            queryObject.last_name = { $regex: last_name, $options: "i" }
        }

        if (email) {
            queryObject.email = { $regex: email, $options: "i" }
        }

        let productQuery = filterModel.find(queryObject)

        productQuery = productQuery.skip(skipPage).limit(limit)
        if (sort) {
            const sortby = sort.split(",").join(" ")
            productQuery = productQuery.sort(sortby)
        }

        if (select) {
            const selectFix = select.split(",").join(" ")
            productQuery = productQuery.select(selectFix)
        }


        const data = await productQuery;
        res.status(200).json({
            success: true,
            message: "geting all data for filter",
            method: "Get",
            nbHits: data.length,
            data: data
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Server Error",
            error: error.message
        });
        next(error)
    }
};

module.exports = filterControllerGet