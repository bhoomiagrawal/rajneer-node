// models/officeLevel.model.js
module.exports = (sequelize, DataTypes) => {
  const OfficeLevel = sequelize.define(
    "OfficeLevel",
    {
      level_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      level_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
    },
    {
      tableName: "m_office_level",
      paranoid: true, // Soft deletes enabled
      timestamps: true, // Automatically managed createdAt and updatedAt fields
    }
  );

  OfficeLevel.associate = (models) => {
    // Relation with m_office
    OfficeLevel.hasMany(models.Office, {
      foreignKey: "office_level_id",
      as: "offices",
    });
  };

  return OfficeLevel;
};
