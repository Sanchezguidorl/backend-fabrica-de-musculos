import { Imagen } from "../models/imagen.model.js";
import fs from 'fs';

export const getImagenes=async(req,res)=>{
try {
    const findImages= await Imagen.find();
    if(!findImages) res.status(204).json({success:true,message:'Image collection is empty'});

    return res.json(findImages);
} catch (error) {
    res.status(500).json({success:false,message:'Image search failed'})
}
};

export const createImagen = async (req, res) => {
    const { name, message } = req.body;
    let imagePath = req.file.path;

if(!name || !imagePath || !message){
 
    return res.status(400).json({ success: false, message: 'Image creation failed, fields are empty'});
}

try {
        const newImage = new Imagen({ name: name, path: imagePath, message: message });
        const image = await newImage.save();
        
        return res.status(201).json({ success: true, message: 'Image created successfully', image: image });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Image creation failed', error: error.message });
    }
};
export const deleteImagen=async(req,res)=>{
    const id= req.params.id;

    try {
        const deletedImage= await Imagen.findByIdAndDelete(id);
        if(!deletedImage) return res.status(204).json();
        const imagePath =deletedImage.path;
        fs.unlinkSync(imagePath);

      return res.status(200).json({success:true, message:'Image was deleted'})
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed image deletion', error: error.message });
    }
};
