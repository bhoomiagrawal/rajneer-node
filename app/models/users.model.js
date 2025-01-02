

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
            unique: true, // Ensures 'sso_id' is uniques
            // indexe                                              
          },
        // other fields here...
        name:{
          type: Sequelize.STRING
        },
        email:{
          type: Sequelize.STRING
        }
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
  