const db = require("../models");
const path = require("path");

exports.postAlbumCreate = async (req, res) => {
    try {
        const { title, artistId } = req.body;

       
        if (!req.files || !req.files.coverImageFile) {
            return res.status(400).send({ message: "La imagen de portada es requerida." });
        }
        // obtengo el archivo de imagen de portada
        const coverImageFile = req.files.coverImageFile;

        // construir la ruta de subida
        const uploadPath = path.join(__dirname, "../uploads", coverImageFile.name);

        
        coverImageFile.mv(uploadPath, async (err) => {
            if (err) {
                console.error("Error al mover el archivo:", err);
                return res.status(500).send({ message: "Error al subir la imagen de portada.", error: err });
            }

            
            const coverImageUrl = `/uploads/${coverImageFile.name}`;
            const album = await db.Album.create({ title, coverImageUrl, artistId });

            res.status(201).send(album);
        });
    } catch (error) {
        console.error("Error al crear el álbum:", error);
        res.status(500).send({ message: "Error al crear el álbum." });
    }
};

exports.getAlbumList = async (req, res) => {
    const { artistId } = req.query; 
    const whereClause = artistId ? { artistId } : {}; 

    const albums = await db.Album.findAll({
        where: whereClause,
        include: [{ model: db.Cancion, as: "songs" }], 
    });

    res.send(albums);
};

exports.getAlbumById = async (req, res) => {
    const { id } = req.params;
    const album = await db.Album.findByPk(id, {
        include: ['songs'],
    });
    if (!album) {
        return res.status(404).send({ message: 'Álbum no encontrado' });
    }
    res.send(album);
};





exports.putAlbumUpdate = async (req, res) => {
    const { id } = req.params;
    const { title, artistId } = req.body;

    // Busca el álbum por ID
    const album = await db.Album.findByPk(id);
    if (!album) {
        return res.status(404).send({ message: "Álbum no encontrado" });
    }

    // Actualiza el título y el ID del artista
    album.title = title;
    album.artistId = artistId;

    // Si se proporciona un archivo, actualiza la imagen
    if (req.files && req.files.coverImageFile) {
        const coverImageFile = req.files.coverImageFile;

      
        const uploadPath = path.join(__dirname, "../uploads", coverImageFile.name);

        // Mueve el archivo a la carpeta de uploads
        coverImageFile.mv(uploadPath, (err) => {
            if (err) {
                console.error("Error al mover el archivo:", err);
                return res.status(500).send({ message: "Error al subir la imagen de portada.", error: err });
            }
        });

        //

        
        album.coverImageUrl = `/uploads/${coverImageFile.name}`;
    }

   
    await album.save();
    res.send(album);
};

exports.deleteAlbum = async (req, res) => {
    const { id } = req.params;
    const album = await db.Album.findByPk(id);
    if (!album) {
        return res.status(404).send({ message: 'Álbum no encontrado' });
    }
    await album.destroy();
    res.status(204).send('');
};