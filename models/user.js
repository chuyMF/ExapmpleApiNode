'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Modelo con los datos que tiene en la base de datos
// Se define en unJson con los tipos de datos
var UserSchema = Schema({
    userName: String,
    password: String,
    displayName: String
});
// Se exporta, los parámetros son el nombre de la entidad y el modelo de la entidad
// Se pone Project porque mongo lo hace enminúsculas y los pluraliza
module.exports = mongoose.model('User', UserSchema);