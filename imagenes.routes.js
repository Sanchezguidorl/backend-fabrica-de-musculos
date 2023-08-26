const multer = require('multer');
const admin = require('firebase-admin');
const { createImagen, deleteImagen, getImagenes } = require('./controllers/imagenes.controller.js');
const serviceAccount = require('./firebase-config.json');
const { Router } = require('express');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const storage = multer.memoryStorage();
const upload = multer({ storage });

const router=Router();

router.get('/images', getImagenes);

router.post('/images/add', upload.single('image'),createImagen);

router.delete('/images/:id/delete', deleteImagen);

module.exports= router;