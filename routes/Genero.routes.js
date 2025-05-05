module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/Genero.controller.js");

    router.get("/", controller.getGeneroList);
   
    router.post("/", controller.postGeneroCreate);
    router.put("/:id", controller.putGeneroUpdate);
    router.delete("/:id", controller.deleteGenero);
    

    app.use('/generos', router);
};