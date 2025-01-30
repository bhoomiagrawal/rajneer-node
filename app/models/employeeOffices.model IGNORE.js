module.exports = (sequelize, DataTypes) => {
  const EmployeeOfficeRelation = sequelize.define(
    "employeeOfficeRelation",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      employee_sso_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "employees",  // References the 'employees' table
          key: "sso_id",  // Ensures this is correctly linked
        },
      },
      office_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "offices",
          key: "office_id",
        },
      },
      designation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      created_by: {
        type: DataTypes.STRING,
      },
      updated_by: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "employee_office_relations",
      paranoid: true,
      timestamps: true,
    }
  );

  // Associations
  EmployeeOfficeRelation.associate = (models) => {
    EmployeeOfficeRelation.belongsTo(models.employees, {
      foreignKey: "employee_sso_id",
      as: "employee",
    });

    EmployeeOfficeRelation.belongsTo(models.offices, {
      foreignKey: "office_id",
      as: "office",
    });
  };

  return EmployeeOfficeRelation;
};
