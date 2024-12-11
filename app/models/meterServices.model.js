// module.exports = (sequelize, Sequelize) => {
//     const meter_service_charges = sequelize.define("meterServices", {
//       id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//       },
//       connectionSize_id: {
//         type: Sequelize.INTEGER,
//         references: {
//           model: 'connectionSize',
//           key: 'id',
//         },
//       },
//       meter_service: {
//         type: Sequelize.STRING
//       },
//       status: {
//         type: Sequelize.INTEGER
//       },
//     }, {
//       tableName: 'meter_service',  // table name in the database
//       timestamps: true,           // automatically adds createdAt, updatedAt fields
//       paranoid: true              // adds deletedAt for soft deletes
//     });
  
//     meter_service_charges.associate = (models) => {
//       // A subcategory belongs to one category
//       meter_service_charges.belongsTo(models.connectionSize, {
//         foreignKey: 'connectionSize_id',
//         as: 'connectionSize',
//       });
//     };
//     return meter_service_charges;
//   };
  


module.exports = (sequelize, Sequelize) => {
  const MeterServices = sequelize.define(
    "meterServices",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      connectionSize_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "connection_size", // Correct table name
          key: "id",
        },
        allowNull: false,
      },
      meter_service: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.INTEGER,
      },
    },
    {
      tableName: "meter_service",
      timestamps: true,
      paranoid: true,
    }
  );

  MeterServices.associate = (models) => {
    // A meter service belongs to one connection size
    MeterServices.belongsTo(models.connectionSize, {
      foreignKey: "connectionSize_id",
      as: "connectionSize",
    });
  };

  return MeterServices;
};
