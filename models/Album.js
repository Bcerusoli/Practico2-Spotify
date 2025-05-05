const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const Album = sequelize.define(
        'Album',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            artistId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            coverImageUrl: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
    );
    return Album;
}