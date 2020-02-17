var User = require('../models/user');
var fs = require('fs');
var path = require('path');

var controller = {
    saveUser: function(req, res) {
        var user = new User();
        var params = req.body;

        user.userName = params.userName;
        user.password = params.password;
        user.displayName = params.displayName;

        user.save((err, userStored) => {
            if (err) return res.status(500).send({error: 'No se pudo guardar el usuario: ' + err})

            if(!userStored) return res.status(404).send({message: 'No se ha podido guardar el usuario'});

            return res.status(200).send({ user: userStored});
        })
    },

    getUser: function (req, res) {
        var userId = req.params.id;

        if(userId == null) return res.status(404).send({message: 'El usuario no existe'});

        User.findById(userId, (err, newUser) => {
            if(err) return res.status(500).send({message: 'Error al devolver los datos'});

            if(!newUser) return res.status(404).send({message: 'El documento no existe'});

            return res.status(200).send({
                user: newUser
            });
        })
    },

    getUsers: function (req, res) {
        User.find({}, (err, users) => {
            if (err) return res.status(200).send({ message: `Error al obtener los datos`});
    
            if(!users) return res.status(404).send({message: 'No hay usuarios'});
    
            res.status(200).send({users});
        })
    },

    updateUser: function(req, res) {
        var userId = req.params.id;
        var update = req.body;
        // Con los parámetros {new: true} haces que la respuesta sean los nuevos datos
        User.findOneAndUpdate(userId, update, (err, userUpdate) => {
            if(err) return res.status(500).send({message: 'Error al actualizar'});

            if(!userUpdate) return res.status(404).send({message: 'No existe el usuario'});

            return res.status(200).send({user: userUpdate});
        })
    },

    deleteUser: function(req, res) {
        var userId = req.params.id;
        User.findByIdAndRemove(userId, (err, userDelete) => {
            if(err) return res.status(500).send({message: 'No se pudo eliminar el usuario'});

            if(!userDelete) return res.status(404).send({message: 'No se pudo eliminar el usuario'});

            return res.status(200).send({
                user: userDelete
            });
        })
    }
}

module.exports = controller;