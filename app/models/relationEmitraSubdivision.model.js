module.exports = (sequelize, DataTypes) => {
  const RelationEmitraSubdivision = sequelize.define(
    "RelationEmitraSubdivision",
    {
      o_subdivision_id: {
        type: DataTypes.STRING, // Ensure this type matches your table definition in MySQL
        primaryKey: true,
        allowNull: false,
      },
      emitra_code: {
        type: DataTypes.STRING, // Ensure this type matches your table definition in MySQL
        // allowNull: false,
      },
    },
    {
      tableName: "relation_emitra_subdivision",
      timestamps: true, // Sequelize will automatically add createdAt and updatedAt
    }
  );
  return RelationEmitraSubdivision;
};
