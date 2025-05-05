module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/Artista.controller.js");

    router.get("/", controller.getArtistaList);
    router.get("/:id", controller.getArtistaById);
    router.get("/genre/:genreId", controller.getArtistsByGenre);
    router.post("/", controller.postArtistaCreate);
    router.put("/:id", controller.putArtistaUpdate);
    router.delete("/:id", controller.deleteArtista);

    app.use('/artistas', router);
};