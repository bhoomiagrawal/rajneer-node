// module.exports = (sequelize, DataTypes) => {
//     const User = sequelize.define('users', {
//         id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//         sso_id: { type: DataTypes.STRING, allowNull: false },
//         name: { type: DataTypes.STRING, allowNull: false },
//         email: { type: DataTypes.STRING, unique: true, allowNull: false },
//         password: { type: DataTypes.STRING, allowNull: false },
//     }, {
//         timestamps: true,
//     });

//     return User
// }

module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define(
      "users",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        sso_id: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true, // Ensures 'sso_id' is unique
            // indexe                                              
          },
        // other fields here...
      },
      {
        tableName: "users",
        timestamps: true,
        paranoid: true,
        indexes: [
            {
              unique: true,
              fields: ['sso_id'], // Explicit index on 'sso_id'
            },
          ],
      }
    );
  
    // Add an index on `sso_id` if it's not the primary key
    // Users.addIndex("sso_id", { fields: ["sso_id"] });
  
    return Users;
  };
  