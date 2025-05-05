const { sequelize } = require("../config/db.config");

const Genero = require("./Genero")(sequelize); 
const Artista = require("./Artista")(sequelize);
const Album = require("./Album")(sequelize);
const Cancion = require("./Cancion")(sequelize);


Genero.hasMany(Artista, {
    foreignKey: "genreId",
    sourceKey: "id",
    as: "artists"
});
Artista.belongsTo(Genero, {
    foreignKey: "genreId",
    as: "genre"
});

Artista.hasMany(Album, {
    foreignKey: "artistId",
    sourceKey: "id",
    as: "albums"
});
Album.belongsTo(Artista, {
    foreignKey: "artistId",
    as: "artist"
});

Album.hasMany(Cancion, {
    foreignKey: "albumId",
    sourceKey: "id",
    as: "songs"
});
Cancion.belongsTo(Album, {
    foreignKey: "albumId",
    as: "album"
});

module.exports = {
    Genero,
    Artista,
    Album,
    Cancion,
    sequelize,
    Sequelize: sequelize.Sequelize
};