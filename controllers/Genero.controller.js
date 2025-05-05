const db = require("../models");
const path = require("path"); 

exports.getGeneroList = async (req, res) => {
    const generos = await db.Genero.findAll();
    res.send(generos);
};

exports.getGeneroById = async (req, res) => {
    const { id } = req.params;
    const genero = await db.Genero.findByPk(id);
    if (!genero) {
        return res.status(404).send({ message: 'Género no encontrado' });
    }
    res.send(genero);
};

exports.postGeneroCreate = async (req, res) => {
    try {
        const { name } = req.body;

        
        if (!req.files || !req.files.imageFile) {
            return res.status(400).send({ message: "La imagen es requerida." });
        }

        const imageFile = req.files.imageFile;

        
        const uploadPath = path.join(__dirname, "../uploads", imageFile.name);

        
        imageFile.mv(uploadPath, async (err) => {
            if (err) {
                return res.status(500).send({ message: "Error al subir la imagen.", error: err });
            }

            
            const imageUrl = `/uploads/${imageFile.name}`;
            const genero = await db.Genero.create({ name, imageUrl });

            res.status(201).send(genero);
        });
    } catch (error) {
        console.error("Error al crear el género:", error);
        res.status(500).send({ message: "Error al crear el género." });
    }
};

exports.putGeneroUpdate = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    
    const genero = await db.Genero.findByPk(id);
    if (!genero) {
        return res.status(404).send({ message: "Género no encontrado" });
    }

    
    genero.name = name;

    
    if (req.files && req.files.imageFile) {
        const imageFile = req.files.imageFile;

        
        console.log("Archivo recibido:", imageFile);

        
        const uploadPath = path.join(__dirname, "../uploads", imageFile.name);

        
        imageFile.mv(uploadPath, (err) => {
            if (err) {
                console.error("Error al mover el archivo:", err);
                return res.status(500).send({ message: "Error al subir la imagen.", error: err });
            }
        });

        
        genero.imageUrl = `/uploads/${imageFile.name}`;
    }

    
    await genero.save();
    res.send(genero);
};

exports.deleteGenero = async (req, res) => {
    const { id } = req.params;
    const genero = await db.Genero.findByPk(id);
    if (!genero) {
        return res.status(404).send({ message: 'Género no encontrado' });
    }
    await genero.destroy();
    res.status(204).send('');
};