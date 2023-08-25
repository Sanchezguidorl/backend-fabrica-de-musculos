import { Router } from "express";
import { createImagen, deleteImagen, getImagenes } from "./controllers/imagenes.controller.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: 'public/images',
  filename: function (req, file, callback) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    callback(null, file.fieldname + '-' + uniqueSuffix + '.jpg'); // Agregar .jpg al final
  },
});
const upload =multer({ storage: storage });

const router=Router();

router.get('/images', getImagenes);

router.post('/images/add', upload.single('image'),createImagen);

router.delete('/images/:id/delete', deleteImagen);

export default router;