const mongoose = require('mongoose');
const { Schema } = mongoose;

const imagenSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        unique: true,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

const ImagenModel= mongoose.model('imagen', imagenSchema);

module.exports = ImagenModel;