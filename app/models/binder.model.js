module.exports = (sequelize, DataTypes) => {
    const Binder = sequelize.define("binder", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      chowkdi_id: {
        type: DataTypes.INTEGER,
        // references: {
        //   model: 'categories', // refers to the Categories model
        //   key: 'id',
        // },
        // allowNull: false,
      },
      binder_name: {
        type: DataTypes.STRING
      },
      binder_code: {
        type: DataTypes.STRING
      },   
      status: {
        type: DataTypes.INTEGER
      },   
    }, {
      tableName: 'binders', // table name in the database
      timestamps: true,           // automatically adds createdAt, updatedAt fields
      paranoid: true              // adds deletedAt for soft deletes
    });
    
    return Binder;
  };