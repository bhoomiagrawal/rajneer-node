module.exports = (sequelize, DataTypes) => {
  const Office = sequelize.define("offices", {
    office_id: { type: DataTypes.STRING, 
      // primaryKey: true
     },
    office_name: DataTypes.STRING,
    office_level_id: DataTypes.INTEGER,
    office_level_name: DataTypes.STRING,
    parent_office_id: DataTypes.STRING,
    parent_office_name: DataTypes.STRING,
    office_district_id: DataTypes.INTEGER,
    office_district_name: DataTypes.STRING,
    org_office_type: DataTypes.STRING,
    office_type_id: DataTypes.STRING,
  },

  {
    tableName: "offices", // Explicit table name
    paranoid: true, // Soft deletes enabled
    timestamps: true, // Automatically managed createdAt and updatedAt fields
  }
);

  Office.associate = (models) => {
    Office.hasMany(models.employees, { foreignKey: "organization_id" });
    Office.hasMany(models.emitra_mapping, { foreignKey: "office_id" });
  };

  return Office;
};
