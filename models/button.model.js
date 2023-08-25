import { Schema,mongoose } from "mongoose";

const buttonSchema= new Schema({
    text:{
        type:String,
        unique:true,
        required:true
    },
    url:{
        type:String,
        required:true
    }
});

export const Button= mongoose.model('button',buttonSchema);
