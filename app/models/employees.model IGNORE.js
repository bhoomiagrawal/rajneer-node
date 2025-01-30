module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define("employees", {
    sso_id: { type: DataTypes.STRING, primaryKey: true, allowNull: true },
    emp_name: DataTypes.STRING,
    emp_code: DataTypes.STRING,
    emp_mob_no: DataTypes.STRING,
    emp_dsgn: DataTypes.STRING,
    dsgn_name: DataTypes.STRING,
    post: DataTypes.STRING,
    organization_id: DataTypes.STRING,
    organization_name: DataTypes.STRING,
    specific_level_id: DataTypes.INTEGER,
    level_name: DataTypes.STRING,
    dob: DataTypes.DATE,
    post_name: DataTypes.STRING,
    post_code: DataTypes.STRING,
    email_id: DataTypes.STRING,
  },
  {
    tableName: "employees", // Explicit table name
    paranoid: true, // Soft deletes enabled
    timestamps: true, // Automatically managed createdAt and updatedAt fields
  });

  Employee.associate = (models) => {
    Employee.belongsTo(models.offices, { foreignKey: "organization_id" });
  };

  return Employee;
};
