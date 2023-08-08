
const express= require('express')
require('dotenv').config();
const {ConectMongo}= require('./database/config');

const cors= require("cors");

const app = express();
ConectMongo();

//directorio publico
app.use(cors())
//var whitelist = ['https://serene-biscochitos-a1ead1.netlify.app']
//var corsOptions = {
//  origin: function (origin, callback) {
//    if (whitelist.indexOf(origin) !== -1) {
//      callback(null, true)
//    } else {
//      callback(new Error('Not allowed by CORS'))
//    }
//  }
//}
//rutas
//lectura y parseo del body(info que recibo desde postaman en un POST)
app.use(express.json());
app.use('/api/auth',require('./routes/auth'));
app.use('/api/events',require('./routes/eventsRoutes'));
app.use(express.static('public'));


app.get('*',(req,res)=>{

    res.sendFile(__dirname + '/public/index.html');
})
//escuchar peticiones
app.listen(process.env.PORT,()=>{
    console.log(`servidor corriendo en el puerto ${process.env.PORT}`);
});
