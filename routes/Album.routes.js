module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/Album.controller.js");


    router.get("/admin", controller.getAlbumList);
    router.get("/admin/:id", controller.getAlbumById);
    router.post("/admin", controller.postAlbumCreate);
    router.put("/admin/:id", controller.putAlbumUpdate);
    router.delete("/admin/:id", controller.deleteAlbum);

   
    router.get("/cliente", controller.getAlbumList);
    router.get("/cliente/:id", controller.getAlbumById);

    app.use('/albums', router);
};