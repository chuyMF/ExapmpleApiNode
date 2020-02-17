'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Modelo con los datos que tiene en la base de datos
// Se define en unJson con los tipos de datos
var ProjectSchema = Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: String,
    image: String
});

// Se exporta, los parámetros son el nombre de la entidad y el modelo de la entidad
// Se pone Project porque mongo lo hace enminúsculas y los pluraliza
module.exports = mongoose.model('Project', ProjectSchema);