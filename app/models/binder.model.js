module.exports = (sequelize, DataTypes) => {
    const Binder = sequelize.define("binder", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        subdivision_id: { type: DataTypes.INTEGER },
        chowkdi_id: {
            type: DataTypes.INTEGER,
            // references: {
            //   model: 'categories', // refers to the Categories model
            //   key: 'id',
            // },
            // allowNull: false,
        },
        binder_name: {
            type: DataTypes.STRING
        },
        binder_code: {
            type: DataTypes.STRING
        },
        created_by: { type: DataTypes.STRING },
        updated_by: { type: DataTypes.STRING },
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

    return Binder;
};