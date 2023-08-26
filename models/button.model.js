const { Schema, mongoose } = require('mongoose');


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

module.exports= mongoose.model('button',buttonSchema);
