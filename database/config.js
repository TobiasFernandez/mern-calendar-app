const mongoose= require('mongoose')




const ConectMongo=async()=>{

    try {
        mongoose.connect(process.env.MNG_CNN,{//ME CONECTO A MONGO
           useUnifiedTopology:true,
            useNewUrlParser:true
        })
        console.log('DB is conected');
    } catch (error) {
        console.log('error');
    }


};

module.exports={

    ConectMongo
}