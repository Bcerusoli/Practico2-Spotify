const db = require("../models");
const path = require("path"); 

exports.getArtistaList = async (req, res) => {
    const artistas = await db.Artista.findAll();
    res.send(artistas);
};

exports.getArtistaById = async (req, res) => {
    const { id } = req.params;
    const artista = await db.Artista.findByPk(id);
    if (!artista) {
        return res.status(404).send({ message: 'Artista no encontrado' });
    }
    res.send(artista);
};

exports.getArtistsByGenre = async (req, res) => {
    const { genreId } = req.params;
    const artistas = await db.Artista.findAll({
        where: { genreId },
    });
    res.send(artistas);
};

exports.postArtistaCreate = async (req, res) => {
    try {
        const { name, genreId } = req.body;

        
        if (!req.files || !req.files.photoFile) {
            console.log("Archivos recibidos:", req.files); 
            return res.status(400).send({ message: "La foto es requerida." });
        }

        const photoFile = req.files.photoFile;

        console.log("Archivo recibido:", photoFile); 

      
        const uploadPath = path.join(__dirname, "../uploads", photoFile.name);
        console.log("Ruta de subida:", uploadPath); 

       
        photoFile.mv(uploadPath, async (err) => {
            if (err) {
                console.error("Error al mover el archivo:", err);
                return res.status(500).send({ message: "Error al subir la foto.", error: err });
            }

            console.log("Archivo movido correctamente."); 

            
            const photoUrl = `/uploads/${photoFile.name}`;
            console.log("URL de la foto:", photoUrl); 

            const artista = await db.Artista.create({ name, photoUrl, genreId });

            console.log("Artista creado:", artista);
            res.status(201).send(artista);
        });
    } catch (error) {
        console.error("Error al crear el artista:", error);
        res.status(500).send({ message: "Error al crear el artista." });
    }
};
exports.putArtistaUpdate = async (req, res) => {
    const { id } = req.params;
    const { name, genreId } = req.body;

    
    const artista = await db.Artista.findByPk(id);
    if (!artista) {
        return res.status(404).send({ message: "Artista no encontrado" });
    }

   
    artista.name = name;
    artista.genreId = genreId;


    if (req.files && req.files.photoFile) {
        const photoFile = req.files.photoFile;

        
        const uploadPath = path.join(__dirname, "../uploads", photoFile.name);

        
        photoFile.mv(uploadPath, (err) => {
            if (err) {
                console.error("Error al mover el archivo:", err);
                return res.status(500).send({ message: "Error al subir la foto.", error: err });
            }
        });

        
        artista.photoUrl = `/uploads/${photoFile.name}`;
    }

    
    await artista.save();
    res.send(artista);
};

exports.deleteArtista = async (req, res) => {
    const { id } = req.params;
    const artista = await db.Artista.findByPk(id);
    if (!artista) {
        return res.status(404).send({ message: 'Artista no encontrado' });
    }
    await artista.destroy();
    res.status(204).send('');
};