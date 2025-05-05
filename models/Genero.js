const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const Genero = sequelize.define(
        'Genero',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            imageUrl: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
    );
    return Genero;
}
