const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
var cors = require('cors');
const path = require("path");

const app = express();
const port = 3000;
const db = require("./models/");

//cors
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Middleware para manejar la subida de archivos
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

// Middleware para servir archivos estáticos desde la carpeta "uploads"
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Sincronización de la base de datos
db.sequelize.sync({
    // force: true // drop tables and recreate
}).then(() => {
    console.log("db resync");
});

// Rutas
require("./routes")(app);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});