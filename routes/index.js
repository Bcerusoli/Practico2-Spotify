module.exports = app => {
    require('./Genero.routes')(app);
    require('./Artista.routes')(app);
    require('./Album.routes')(app);
    require('./Cancion.routes')(app);
};