const { Schema, model } = require("mongoose");


const UsuarioModel= Schema({
    name:{
         type:String,
        required:true
    },

    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true

    }


})

module.exports= model('Usuario',UsuarioModel);