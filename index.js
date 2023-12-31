const path = require('path')
const express= require('express')
require('dotenv').config();
const {ConectMongo}= require('./database/config');

const cors= require("cors");

const app = express();
ConectMongo();
    
//const corsOpts = {
//    origin: 'https://mern-calendar-app-production-1e03.up.railway.app',
//    credentials: true,
//    methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
//    allowedHeaders: ['Content-Type'],
//    exposedHeaders: ['Content-Type']
//};
app.use(cors());

//directorio publico

//var whitelist = ['https://serene-biscochitos-a1ead1.netlify.app',
//"https://mern-calendar-app-production-1e03.up.railway.app/auth/login",
//"https://mern-calendar-app-production-1e03.up.railway.app/events/create",
//"https://mern-calendar-app-production-1e03.up.railway.app/events/read",
//"https://mern-calendar-app-production-1e03.up.railway.app/events/delete",
//"https://mern-calendar-app-production-1e03.up.railway.app/events/create",
//"https://mern-calendar-app-production-1e03.up.railway.app/events/update",
//'https://mern-calendar-app-production-1e03.up.railway.app',
//"https://mern-calendar-app-production-1e03.up.railway.app/auth/new"
//
//
//]
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
app.use(express.static(path.join(__dirname, 'public')));


//app.get('/*', function(req,res) {
//  res.sendFile(path.join(__dirname, 'public', 'index.html'));
//});
//escuchar peticiones
app.listen(process.env.PORT,()=>{
    console.log(`servidor corriendo en el puerto ${process.env.PORT}`);
});
