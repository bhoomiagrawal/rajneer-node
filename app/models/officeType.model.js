// models/officeType.model.js
module.exports = (sequelize, DataTypes) => {
    const OfficeType = sequelize.define(
      "OfficeType",
      {
        type_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        type_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: "m_office_type",
        timestamps: true,
      }
    );
  
    OfficeType.associate = (models) => {
      // Relation with m_office
      OfficeType.hasMany(models.Office, {
        foreignKey: "office_type_id",
        as: "offices",
      });
    };
  
    return OfficeType;
  };
  