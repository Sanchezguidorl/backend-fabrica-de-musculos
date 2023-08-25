import mongoose, { Schema } from "mongoose";

const imagenSchema= new Schema({
    name: {
        type:String,
        required: true
    },
    path:{
        type:String,
        unique:true,
        required:true
    },
    message:{
        type:String,
        require: true
    }
});

export const Imagen=mongoose.model('imagen',imagenSchema);
