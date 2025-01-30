module.exports = (sequelize, Sequelize) => {
    const ConsumerData = sequelize.define(
        'consumerData',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            cin_number: {
                type: Sequelize.STRING,
                allowNull: true,
                unique: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            // Other fields remain the same...
            address1: {
                type: Sequelize.STRING,
            },
            address2: {
                type: Sequelize.STRING,
            },
            address3: {
                type: Sequelize.STRING,
            },
            mobile_number: {
                type: Sequelize.STRING,
            },
            division: {
                type: Sequelize.STRING,
            },
            // sdo_id: {
            //     type: Sequelize.INTEGER,
            //     allowNull: true,
            //     references: {
            //         model: 'm_office', // Correct model name here
            //         key: 'office_level_id', // Correct foreign key here
            //     },
            //     onDelete: 'SET NULL',
            //     onUpdate: 'CASCADE',
            // },
            // Other fields...
       

        group: {
            type: Sequelize.STRING,
        },
        chk: {
            type: Sequelize.STRING,
        },
        account_no: {
            type: Sequelize.STRING,
        },
        service_no: {
            type: Sequelize.STRING,
        },
        sewerage: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        stp: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        rebate_off: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        category_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'categories',
                key: 'id',
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
        connection_type_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'connection_type',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        connection_size_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'connection_size',
                key: 'id',
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
        meter_no: {
            type: Sequelize.STRING,
        },
        meter_status_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'meter_status',
                key: 'id',
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
        status: {
            type: Sequelize.INTEGER, // 1 = Active, 0 = Inactive
            allowNull: true,
            defaultValue: 1,
        },
    },
        {
            tableName: 'consumer_data',
            timestamps: true,
            paranoid: true,
        }
    );

    ConsumerData.associate = (models) => {
        ConsumerData.belongsTo(models.categories, {
            foreignKey: 'category_id',
            as: 'category',
        });
        ConsumerData.belongsTo(models.connectionType, {
            foreignKey: 'connection_type_id',
            as: 'connectionType',
        });
        ConsumerData.belongsTo(models.connectionSize, {
            foreignKey: 'connection_size_id',
            as: 'connectionSize',
        });
        ConsumerData.belongsTo(models.meterStatus, {
            foreignKey: 'meter_status_id',
            as: 'meterStatus',
        });
        // ConsumerData.belongsTo(models.Office, {
        //     foreignKey: 'sdo_id',
        //     as: 'sdo',
        // });
    };

    return ConsumerData;
};
