module.exports = (sequelize, Sequelize) => {
    const ConsumerData = sequelize.define(
        'consumerData', // This name should match the reference in `models`
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.STRING,
            },
            cin_number: {
                type: Sequelize.STRING,
            },
            address: {
                type: Sequelize.STRING,
            },
            mobile_number: {
                type: Sequelize.STRING, 
            },
            category_id: {
                type: Sequelize.INTEGER,
                allowNull: true, // Foreign key is nullable
                references: {
                    model: 'categories', // Correctly reference categories table
                    key: 'id',
                },
                onDelete: 'NO ACTION',
                onUpdate: 'CASCADE',
            },
            // subcategory_id: {
            //     type: Sequelize.INTEGER,
            //     references: {
            //         model: 'subcategories', // refers to the Categories model
            //         key: 'id',
            //     },
            //     allowNull: false,
            // },
            conn_type_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'connection_type', // refers to the Categories model
                    key: 'id',
                },
                allowNull: false,
            },
            connection_size_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'connection_size', // Correctly reference connection_size table
                    key: 'id',
                },
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            },
            meter_status_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'meter_status', // Correctly reference meter status table
                    key: 'id',
                },
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            },
            status: {
                type: Sequelize.INTEGER, // Active (1) / Inactive (0)
                allowNull: false,
                defaultValue: 1
            },
        },
        {
            tableName: 'consumer_data',
            timestamps: true,
            paranoid: true,
        }
    );



    ConsumerData.associate = (models) => {
        ConsumerData.belongsTo(models.categories, { // Ensure this matches your categories model name
            foreignKey: 'category_id',
            as: 'category',
        });
        // ConsumerData.belongsTo(models.subcategories, {
        //     as: 'subcategories',
        //     foreignKey: 'subcategory_id',
        // });
        ConsumerData.belongsTo(models.connectionType, {
            as: 'connectionType',
            foreignKey: 'conn_type_id',
        });
        ConsumerData.belongsTo(models.connectionSize, {
            foreignKey: 'connection_size_id',
            as: 'connectionSize', // Alias for connectionSize relationship
        });
        ConsumerData.belongsTo(models.meterStatus, {
            foreignKey: 'meter_status_id',
            as: 'meterStatus', // Alias for meterStatus relationship
        });

        // ConsumerData.hasMany(models.consumerBillData, {
        //     as: 'consumerBillData',
        //     foreignKey: 'consumer_id',
        //   });
    };

    return ConsumerData;
};

