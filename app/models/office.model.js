// models/office.model.js
module.exports = (sequelize, DataTypes) => {
    const Office = sequelize.define(
      "Office",
      {
        office_id: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
        office_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        office_short_name: {
          type: DataTypes.STRING,
        },
        office_address: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        dt_created: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        dt_updated: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        office_level_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "m_office_level",
            key: "level_id",
          },
        },
        office_type_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "m_office_type",
            key: "type_id",
          },
        },
        parent_office_id: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        tableName: "m_office",
        timestamps: true,
      }
    );
  
    Office.associate = (models) => {
      // Relation with OfficeLevel
      Office.belongsTo(models.OfficeLevel, {
        foreignKey: "office_level_id",
        as: "level",
      });
  
      // Relation with OfficeType
      Office.belongsTo(models.OfficeType, {
        foreignKey: "office_type_id",
        as: "type",
      });
    };
  
    return Office;
  };
  