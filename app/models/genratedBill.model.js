module.exports = (sequelize, Sequelize) => {
    const GeneratedBill = sequelize.define('generatedBill', {
        
    })
















    const Categories = sequelize.define(
        'categories', // This name should match the reference in `models`
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            category_name: {
                type: Sequelize.STRING,
            },
            category_code: {
                type: Sequelize.STRING,
            },
        },
        {
            tableName: 'categories',
            timestamps: true,
            paranoid: true,
        }
    );

    Categories.associate = (models) => {
        Categories.hasMany(models.subcategories, {
            as: 'subcategories',
            foreignKey: 'category_id',
        });

        Categories.hasMany(models.slabs, {
            foreignKey: 'category_id',
            as: 'slabs',
        });
    };

    return GeneratedBill;
};