const { log } = require("console");
const {response}=require('express');
const Usuario = require("../models/Usuario");
const bcrypt= require("bcrypt");
const { REFUSED } = require("dns");
const { stat } = require("fs");
const { CreateJWT } = require("../helpers/jwt");


const crearUsuario =async (req,res)=>{
         const{email,password,name}=req.body
         try {
             let usuario= await Usuario.findOne({email})
             if (usuario) {
             return res.status(400).json({
                 ok:false,
                 msg:'el usuario ya existe'
         })
         };
     
             usuario= new Usuario(req.body);
             const salt= bcrypt.genSaltSync(10);
             const hash= bcrypt.hashSync(password,salt);
             usuario.password=hash;//encriptamos la passwrd del user

             await usuario.save();
             const token= await CreateJWT(usuario.name,usuario.id);

               if (!token) {
                 res.status(400).json({
                     erro:'error, plis try again'
                 })
               }
           
             res.status(200).json({
                 servidor:true,
                 email,
                 password:usuario.password,
                 name:usuario.name,
                 id: usuario.id,
                 token
         });
     
         } catch (error) {
             console.log(error);
              res.status(500).json({
                 ok:false,
                 msg:"por favor hable con el administrador"
             })
         };
   
}

const loginUsuer=async(req,res=response)=>{
  
        const {email,password}=req.body;
    try {
    
    let usuario= await Usuario.findOne({email});

    if (!usuario) {
    return res.status(400).json({
        ok:false,
        msg:'el usuario no existe'
    })};   

    const matchPasswrd=bcrypt.compareSync(password,usuario.password);
    const token= await CreateJWT(usuario.name,usuario.id);
   
    if (matchPasswrd) {
        res.status(200).json(
            {
                ok:true,
                token
            }
        );
    }

     }catch (error) {
        console.log(error);
        res.status(500).json({
         ok:false,
         msg:"por favor hable con el administrador"
   })
}

};

const revalidarToken =async(req,res)=>{
    const {name}=req;
const id=req.id
const newToken= await CreateJWT(name,id);
   
    res.json({
    user:"token verificado",
    id,
    name,
    newToken

    })
};
//exportaciones
module.exports={
    crearUsuario,
    loginUsuer,
    revalidarToken
}