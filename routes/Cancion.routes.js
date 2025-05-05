module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/Cancion.controller.js");

    
    router.get("/admin", controller.getCancionList);
    router.get("/admin/:id", controller.getCancionById);
    router.post("/admin", controller.postCancionCreate);
    router.put("/admin/:id", controller.putCancionUpdate);
    router.delete("/admin/:id", controller.deleteCancion);

   
    router.get("/cliente", controller.getCancionList);
    router.get("/cliente/:id", controller.getCancionById);

    app.use('/canciones', router);
};