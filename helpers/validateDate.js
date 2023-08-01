const moment=require('moment');



const validateDate=(rest)=>{

  if (!rest) {
    return false
  }


    const validacion=moment(rest);
    if (validacion.isValid()) {
    return true
    }else{
    return false
    }
};

module.exports={validateDate};