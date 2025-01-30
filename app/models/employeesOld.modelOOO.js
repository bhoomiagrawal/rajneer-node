module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    "employees",
    {
      sso_id: { type: DataTypes.STRING, allowNull: false, 
        primaryKey: true 
      },
      emp_name: { type: DataTypes.STRING },
      emp_code: { type: DataTypes.STRING },
      emp_mob_no: { type: DataTypes.STRING },
      emp_dsgn: { type: DataTypes.STRING },
      dsgn_name: { type: DataTypes.STRING },
      post: { type: DataTypes.STRING },
      organization_id: { type: DataTypes.STRING },
      organization_name: { type: DataTypes.STRING },
      specific_level_id: { type: DataTypes.INTEGER },
      level_name: { type: DataTypes.STRING },
      office_address: { type: DataTypes.STRING },
      dt_updated: { type: DataTypes.DATE },
      dt_created: { type: DataTypes.DATE },
      dob: { type: DataTypes.DATE },
      post_name: { type: DataTypes.STRING },
      post_code: { type: DataTypes.STRING },
      email_id: { type: DataTypes.STRING },
    },
    {
      tableName: "employees", // Explicit table name
      paranoid: true, // Soft deletes enabled
      timestamps: true, // Automatically managed createdAt and updatedAt fields
    }
  );

    // Associations
    Employee.associate = (models) => {
        Employee.hasMany(models.employeeOfficeRelation, {
          foreignKey: "employee_sso_id",
          as: "employeeOfficeRelations",
        });
      };
  return Employee
};
