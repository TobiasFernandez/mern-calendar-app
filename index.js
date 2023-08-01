
const express= require('express')
require('dotenv').config();
const {ConectMongo}= require('./database/config');


const app = express();
ConectMongo();

//directorio publico
app.use(express.static('public'));
//rutas
//lectura y parseo del body(info que recibo desde postaman en un POST)
app.use(express.json());
app.use('/api/auth',require('./routes/auth'));
app.use('/api/events',require('./routes/eventsRoutes'));


//escuchar peticiones
app.listen(process.env.PORT,()=>{
    console.log(`servidor corriendo en el puerto ${process.env.PORT}`);
});
