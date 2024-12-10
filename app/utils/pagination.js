// paginationAndSearchHelper.js

const { Op } = require('sequelize');  // Ensure to import Op from Sequelize if you're using Sequelize

// Function to handle pagination and search
const getPaginationAndSearch = (req, searchField = 'subcategory_name') => {
    // Extract pagination and search query parameters
    let page = Number(req?.query?.page) || 0;  // Default to 0 if not provided
    let perPage = Number(req?.query?.perPage) || 10;  // Default to 10 if not provided
    let searchItem = req.query.searchItem;

    // If searchItem is provided, reset page to 0 for a fresh search
    if (searchItem) {
        page = 0; // Reset to first page for fresh search
    }

    // Calculate the offset for pagination
    let offset = page > 0 ? page * perPage : 0;

    // Build the search filter condition
    let whereCondition = {};

    if (searchItem) {
        // If searchItem is provided, apply search filter dynamically based on the field
        whereCondition = {
            // [Op.and]: [
            //     { deletedAt: null },  // Ensure deletedAt = null
            //     {
                    [Op.or]: [
                        { [searchField]: { [Op.like]: "%" + searchItem + "%" } }
                    ]
            //     }
            // ]
        };
    }

    return {
        page,
        perPage,
        offset,
        whereCondition,
    };
};

module.exports = {
    getPaginationAndSearch,
};
