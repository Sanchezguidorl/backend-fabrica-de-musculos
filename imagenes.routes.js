const multer = require("multer");
const admin = require("firebase-admin");
const {
  createImagen,
  deleteImagen,
  getImagenes,
} = require("./controllers/imagenes.controller.js");
const serviceAccount = require("./firebase-config.json");
const { Router } = require("express");
const { validateToken } = require("./authentication/authMethods.js");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();

router.get("/images", getImagenes);

router.post("/images/add", upload.single("image"), validateToken, createImagen);

router.delete("/images/:id/delete", validateToken, deleteImagen);

module.exports = router;
