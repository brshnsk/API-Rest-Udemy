const express = require("express");
const debug = require('debug')('app:inicio');
const morgan = require('morgan');
const config = require('config');
const usuarios = require('./routes/usuarios');
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use('/api/usuarios', usuarios);

//configuracion de entornos
console.log('Aplicacion ' + config.get('nombre'));
console.log('BD Server: ' + config.get('configDB.host'));

// middleware de tercero
if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    //console.log('Morgan funcionando')
    debug('Morgan funcionando');
};

app.get('/',(req, res) => {
    res.send ('Prueba Res');
});

const port = process.env.PORT || 3000;

app.listen(port,() =>{
    console.log (`Escuchando en el puerto ${port}`);
});
