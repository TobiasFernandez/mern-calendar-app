const jwt = require("jsonwebtoken");


const revalidaation=(req,res,next)=>{

    const token= req.header('x-token');
 
    const verifcacion= jwt.verify(token,process.env.PRIVATE_KEY);
    console.log(verifcacion);
    if (!verifcacion) {
     res.status(400).json({
        error:'token no valido'

     })
    }
     req.id=verifcacion.id
     req.name=verifcacion.name
     req.token=token
    next();
}

module.exports={
    revalidaation
};