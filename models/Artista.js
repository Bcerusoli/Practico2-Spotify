const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const Artista = sequelize.define(
        'Artista',
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
            photoUrl: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            genreId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
    );
    return Artista;
}