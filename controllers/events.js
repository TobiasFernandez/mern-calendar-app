const { check } = require("express-validator");
const Events = require("../models/Events");
const Usuario = require("../models/Usuario");
const mongoose=require('mongoose');

const ReadEvents=async(req,res)=>{

    const{msg,id}=req.body
     const Eventos= await Events.find().populate('_id')
     
  return  res.status(200).json({

        ok:true,
        msg,
        Eventos,
        name:req.name
      
    })
};


const CreateEvent=async(req,res)=>{
  
    const NewEvent= new Events(req.body);
    
 
    try {
      NewEvent.user= req.id
      const nuevo= await NewEvent.save()
console.log(nuevo);
     return  res.status(200).json({
        ok:true,
       nuevo,
        name:req.name
      
        
        
    })

    } catch (error) {
    console.log(error);
    }

  
};

const UpdateEvent=async(req,res)=>{
    const eventoID= req.params.id;
    const idUser= req.id;

    try {
       const Event= await Events.findById(eventoID);
       console.log(Event.user.toString());
       console.log(idUser);
        if (!Event) {
          return  res.status(404).json({
                ok: false,
                error:'el evento no existe'

            });
        }

        if (Event.user.toString() !== idUser) {
          return  res.status(400).json({
               error:"estas editando un archivo en el que no tienes privilegio"
            });
        }
        const nuevoEvento={
            ...req.body,
            user:idUser
        }

        const eventoActualizado= await Events.findByIdAndUpdate(Event,nuevoEvento,{new:true});
        res.status(200).json({
            ok:true,
            eventoActualizado
            

        })

    } catch (error) {
        res.status(400).json({

            error
        })
    }




   
};

const DelatevEvent=async(req,res)=>{
    
    const eventoID= req.params.id;
    const  idUser=req.id;
     
    try {
        
        const Event= await Events.findById(eventoID);
        if (!Event) {
            return   res.status(400).json({
                  error:"el evento no existe"    
               })
        }

        if (Event.user.toString() !== idUser) {
            return res.status(401).json({
                error: "No tienes privilegio de borrar este arhivo"

             })
        }

        await Events.findByIdAndDelete(Event);

        res.status(200).json({
            ok:true
        })
    } catch (error) {
        res.status(400).json({
            error:error
        })
    }
       
};

module.exports={

    ReadEvents,
    CreateEvent,
    UpdateEvent,
    DelatevEvent
}