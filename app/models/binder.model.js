module.exports = (sequelize, DataTypes) => {
    const Binder = sequelize.define("binder", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        subdivision_id: { 
            type: DataTypes.INTEGER,
            // references: {
            //     model: 'subdivisions', // The table that 'subdivision_id' references
            //     key: 'id', // The field in the referenced table
            // },
            // allowNull: false, // Make it required
         },
        chowkdi_id: {
            type: DataTypes.INTEGER,
            // references: {
            //     model: 'chowkdis', // The table that 'chowkdi_id' references
            //     key: 'id', // The field in the referenced table
            // },
            // allowNull: false, // Make it required
        },
        binder_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        binder_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created_by: {
             type: DataTypes.STRING ,
             allowNull: false,
            },
        updated_by: {
             type: DataTypes.STRING,
             allowNull: false,
             },
        status: {
            type: DataTypes.INTEGER, // Active (1) / Inactive (0)
            allowNull: false,
            defaultValue: 1
        },
    }, {
        tableName: 'binders', // table name in the database
        timestamps: true,           // automatically adds createdAt, updatedAt fields
        paranoid: true              // adds deletedAt for soft deletes
    });


    //  // Adding associations (if needed)
    //  Binder.associate = function(models) {
    //     // Associations can be defined here
    //     Binder.belongsTo(models.Subdivision, {
    //         foreignKey: 'subdivision_id', 
    //         as: 'subdivision'
    //     });
    //     Binder.belongsTo(models.Chowkdi, {
    //         foreignKey: 'chowkdi_id',
    //         as: 'chowkdi'
    //     });
    // };

    return Binder;
};