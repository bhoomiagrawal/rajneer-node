module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, unique: true, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
    }, {
        timestamps: true,
    });

    return User
}
