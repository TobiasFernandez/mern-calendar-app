const jwt = require("jsonwebtoken");
const { Promise } = require("mongoose");
require("dotenv").config()


const CreateJWT=async(name,id)=>{
    
   
       
      
        const payload={
            name,id
    
        }
         const token=   jwt.sign(payload,process.env.PRIVATE_KEY,{
                expiresIn:'2h'
            });
        
        return token
            
        

}
  
module.exports={
CreateJWT

};