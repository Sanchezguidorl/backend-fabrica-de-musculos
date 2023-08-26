const ImagenModel = require('../models/imagen.model.js');
const admin = require('firebase-admin');
const fs = require('fs');

 const getImagenes=async(req,res)=>{
try {
    const findImages= await ImagenModel.find();
    if(!findImages) res.status(204).json({success:true,message:'Image collection is empty'});

    return res.json(findImages);
} catch (error) {
    res.status(500).json({success:false,message:'Image search failed'})
}
};

const createImagen = async (req, res) => {
    const { name, message } = req.body;

    if (!name || !message) {
        return res.status(400).json({ success: false, message: 'Image creation failed, fields are empty'});
    }

    try {
        const bucket = admin.storage().bucket('gs://fabrica-de-musculos-server.appspot.com');
        const file = req.file;

        if (!file) {
            return res.status(400).json({ success: false, message: 'Image creation failed, no image file provided' });
        }

        // Subir la imagen a Firebase Cloud Storage
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileName = file.originalname;
        const filePath = `images/${uniqueSuffix}-${fileName}`;

        await bucket.file(filePath).save(file.buffer, {
            metadata: {
                contentType: file.mimetype,
            },
        });
        const newImage = new ImagenModel({ name: name, path: filePath, message: message });
        const image = await newImage.save();
        
        return res.status(201).json({ success: true, message: 'Image created successfully', image: image });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Image creation failed', error: error.message });
    }
};
const deleteImagen = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedImage = await ImagenModel.findByIdAndDelete(id);
        if (!deletedImage) return res.status(204).json();
        const pathImage = deletedImage.path;
        const regex = /\\\\/g;
        // Sustituir las dobles barras invertidas por una sola barra diagonal
        const imagePath = pathImage.replace(regex, '/');
        
        // Eliminar la imagen del almacenamiento de Firebase
        const bucket = admin.storage().bucket('gs://fabrica-de-musculos-server.appspot.com');
        await bucket.file(imagePath).delete();

        return res.status(200).json({ success: true, message: 'Image was deleted' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed image deletion', error: error.message });
    }
};

module.exports={getImagenes,createImagen,deleteImagen};