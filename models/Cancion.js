const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const Cancion = sequelize.define(
        'Cancion',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            albumId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            audioFileUrl: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
    );
    return Cancion;
}