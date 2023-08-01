//in node js, the middleware functions are functions that have access
//to the req(request), the res(response), and the next middleware functions
//in the applications.

const { validationResult } = require("express-validator");

const validationsMiddleware=(req,res,next)=>{

    const error = validationResult(req)
    
    if (!error.isEmpty()) {
        res.status(400).json({
        
            errors:error.mapped()
    
        });
    }
    
    next();
}

module.exports={
    validationsMiddleware
}