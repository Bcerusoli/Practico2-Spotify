const db = require("../models");
const path = require("path"); 
const fs = require("fs"); 

exports.getCancionList = async (req, res) => {
    const canciones = await db.Cancion.findAll();
    res.send(canciones);
};

exports.getCancionById = async (req, res) => {
    const { id } = req.params;
    const cancion = await db.Cancion.findByPk(id);
    if (!cancion) {
        return res.status(404).send({ message: 'Canción no encontrada' });
    }
    res.send(cancion);
};

exports.postCancionCreate = async (req, res) => {
    try {
        const { title, albumId } = req.body;

       //verifico si se envio el archivo
        if (!req.files || !req.files.audioFile) {
            return res.status(400).send({ message: "El archivo de audio es requerido." });
        }
        //obtengo el archivo de audio
        const audioFile = req.files.audioFile;

        
        const album = await db.Album.findByPk(albumId);
        if (!album) {
            return res.status(400).send({ message: "El álbum especificado no existe." });
        }

        
        const cancionesDir = path.join(__dirname, "../uploads/canciones");

        
        if (!fs.existsSync(cancionesDir)) {
            fs.mkdirSync(cancionesDir, { recursive: true });
        }

        const uploadPath = path.join(cancionesDir, audioFile.name);

        
        audioFile.mv(uploadPath, async (err) => {
            if (err) {
                return res.status(500).send({ message: "Error al subir el archivo.", error: err });
            }

            
            const cancion = await db.Cancion.create({
                title,
                albumId,
                audioFileUrl: `/uploads/canciones/${audioFile.name}`
            });

            res.status(201).send(cancion);
        });
    } catch (error) {
        res.status(500).send({ message: "Error al crear la canción.", error });
    }
};

exports.putCancionUpdate = async (req, res) => {
    const { id } = req.params;
    const { title, albumId } = req.body;

    
    const cancion = await db.Cancion.findByPk(id);
    if (!cancion) {
        return res.status(404).send({ message: "Canción no encontrada" });
    }

    
    cancion.title = title;
    cancion.albumId = albumId;

    
    if (req.files && req.files.audioFile) {
        const audioFile = req.files.audioFile;

        
        const cancionesDir = path.join(__dirname, "../uploads/canciones");

        
        if (!fs.existsSync(cancionesDir)) {
            fs.mkdirSync(cancionesDir, { recursive: true });
        }

        const uploadPath = path.join(cancionesDir, audioFile.name);

        
        audioFile.mv(uploadPath, (err) => {
            if (err) {
                console.error("Error al mover el archivo:", err);
                return res.status(500).send({ message: "Error al subir el archivo.", error: err });
            }
        });

        
        cancion.audioFileUrl = `/uploads/canciones/${audioFile.name}`;
    }

    
    await cancion.save();
    res.send(cancion);
};

exports.deleteCancion = async (req, res) => {
    const { id } = req.params;
    const cancion = await db.Cancion.findByPk(id);
    if (!cancion) {
        return res.status(404).send({ message: 'Canción no encontrada' });
    }
    await cancion.destroy();
    res.status(204).send('');
};