module.exports = (sequelize, Sequelize) => {
    const fixedCharges = sequelize.define(
        'fixedCharges', // Model name
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            tariff_id: {
                type: Sequelize.INTEGER,
                references: {
                  model: "tariff_configuration", // Name of the table
                  key: "id",
                },
                allowNull: false,
              },
            connection_size_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'connection_size', // Reference the correct table name
                    key: 'id',
                },
                onDelete: 'CASCADE', // Delete fixed charges if the connection size is deleted
                onUpdate: 'CASCADE', // Update foreign key on connection size change
            },
            category_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'categories', // Reference the correct categories table
                    key: 'id',
                },
                onDelete: 'NO ACTION',
                onUpdate: 'CASCADE',
            },
            
        },
        {
            tableName: 'fixed_charges', // Table name in the database
            timestamps: true,          // Automatically add createdAt and updatedAt
            paranoid: true,            // Add deletedAt for soft deletes
        }
    );

    fixedCharges.associate = (models) => {
        // Relationships
        fixedCharges.belongsTo(models.connectionSize, {
            foreignKey: 'connection_size_id',
            as: 'connectionSize',
        });

        fixedCharges.belongsTo(models.categories, {
            foreignKey: 'category_id',
            as: 'category',
        });
        fixedCharges.belongsTo(models.tariffConfiguration, {
            foreignKey: "tariff_id",
            as: "tariff",
          });
    };

    return fixedCharges;
};
