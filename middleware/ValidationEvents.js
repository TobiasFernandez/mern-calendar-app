const { validationResult } = require("express-validator");



const EventsValidator=(req,res,next)=>{

const verificacion= validationResult(req)
if(!verificacion.isEmpty()){
  res.status(400).json({

    error:verificacion.mapped()
  })

}

next();
}

module.exports={
    EventsValidator
}
