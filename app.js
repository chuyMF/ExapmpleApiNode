'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// archivos de rutas
var projectRoutes = require('./routes/project');

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));


app.use(bodyParser.json());

// CORS
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// rutas
app.use('/api', projectRoutes);

// exportar
module.exports = app;