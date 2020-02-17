'use strict'

// Se requiere el módulo de mongoose
var mongoose = require('mongoose');
var app = require('./app');

app.set('port', process.env.PORT || 3000)
// Se hará una promesa
mongoose.Promise = global.Promise;

// El método connect (Que recibe la cadena de conexión) se encargará de establecerla
mongoose.connect('mongodb+srv://chuy99:chuy99@cluster0-quhju.mongodb.net/test?retryWrites=true&w=majority')
    // El método then recibe función de callback
    .then(() => {
        console.log("Conexion a la base de datos establecida satisfactoriamente...");

        // Creación del servidor
        app.listen(app.get('port'), () => {
            console.log("Servidor corriendo correctamente en la url localhost: ", app.get('port'));
        });

    })
    // catch en caso de tener un error
    .catch(err => console.log(err));