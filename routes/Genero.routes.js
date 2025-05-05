module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/Genero.controller.js");

    router.get("/", controller.getGeneroList);
    router.get("/:id", controller.getGeneroById);
    router.post("/", controller.postGeneroCreate);
    router.put("/:id", controller.putGeneroUpdate);
    router.delete("/:id", controller.deleteGenero);
    

    app.use('/generos', router);
};