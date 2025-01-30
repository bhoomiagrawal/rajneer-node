module.exports = (sequelize, DataTypes) => {
    const EmitraMapping = sequelize.define("emitra_mapping", {
      district_code: DataTypes.STRING,
      district_name: DataTypes.STRING,
      circle_code: DataTypes.STRING,
      circle_name: DataTypes.STRING,
      division_code: DataTypes.STRING,
      division_name: DataTypes.STRING,
      sub_division_code: DataTypes.STRING,
      sub_division_name: DataTypes.STRING,
      emitra_new_code: DataTypes.STRING,
      office_id: DataTypes.STRING,
    },
    {
        tableName: "emitra_mapping", // Explicit table name
        paranoid: true, // Soft deletes enabled
        timestamps: true, // Automatically managed createdAt and updatedAt fields
      }
);
  
    EmitraMapping.associate = (models) => {
      EmitraMapping.belongsTo(models.offices, { foreignKey: "office_id" });
    };
  
    return EmitraMapping;
  };
  