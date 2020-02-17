'use strict';
var Project = require('../models/project');
var fs = require('fs');
var path = require('path');

var controller = {
    home: function(req, res) {
        return res.status(200).send({
            message: 'Soy la home'
        });
    },

    test: function(req, res) {
        return res.status(200).send({
            message: 'Soy el método o acción test del controlador project'
        });
    },

    saveProject: function(req, res){
		var project = new Project();

		var params = req.body;

        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        project.save((err, projectStored) => {
            if(err) return res.status(500).send({error: err});

            if(!projectStored) return res.status(404).send({message: 'No se ha podido guardar el proyecto'});

            return res.status(200).send({project: projectStored});
        });
        // return res.status(200).send({
        //          project: project,
        //          message: "Método saveProject"
        // })

		// project.save((err, projectStored) => {
		// 	if(err) return res.status(500).send({message: 'Error al guardar el documento.'});

		// 	if(!projectStored) return res.status(404).send({message: 'No se ha podido guardar el proyecto.'});

		// 	return res.status(200).send({project: projectStored});
		// });
    },
    
    getProject: function(req, res) {
        var projectId = req.params.id;

        if(projectId == null) return res.status(404).send({message: 'El proyecto no existe'});
        
        Project.findById(projectId, (err, proje) => {
            if(err) return res.status(500).send({message: 'Error al devolver los datos'});

            if(!proje) return res.status(404).send({message: 'El documento no existe'});

            return res.status(200).send({
                project: proje
            });
        });
    },

    getProjects: function (req, res) {
        // El sort sirve para ordenarlos según algún parámetro, -year los ordena de mayor a menor
        Project.find({}).sort('-year').exec((err, projects) => {
            if(err) return res.status(500).send({message: 'Error al devolver los datos'});

            if(!projects) return res.status(404).send({message: 'No hay proyectos'});

            return res.status(200).send({projects});
        });
    },

    updateProject: function(req, res) {
        var projectId = req.params.id;
        var update = req.body;
        // Con los parámetros {new: true} haces que la respuesta sean los nuevos datos
        Project.findByIdAndUpdate(projectId, update, {new: true}, (err, projectUpdate) => {
            if(err) return res.status(500).send({message: 'Error al actualizar'});

            if(!projectUpdate) return res.status(404).send({message: 'No existe el projecto'});

            return res.status(200).send({project: projectUpdate});
        })
    },

    deleteProject: function(req, res) {
        var projectId = req.params.id;
        Project.findByIdAndRemove(projectId, (err, projectDelete) => {
            if(err) return res.status(500).send({message: 'No se pudo eliminar el proojecto'});

            if(!projectDelete) return status(404).send({message: 'No se pudo eliminar el projecto'});

            return res.status(200).send({
                project: projectDelete
            });
        })
    },

    uploadImage: function(req, res){
		var projectId = req.params.id;
		var fileName = 'Imagen no subida...';

		if(req.files){
			var filePath = req.files.image.path;
			var fileSplit = filePath.split('\\');
			var fileName = fileSplit[1];
			var extSplit = fileName.split('\.');
			var fileExt = extSplit[1];

			if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){

				Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true}, (err, projectUpdated) => {
					if(err) return res.status(500).send({message: 'La imagen no se ha subido'});

					if(!projectUpdated) return res.status(404).send({message: 'El proyecto no existe y no se ha asignado la imagen'});

					return res.status(200).send({
						project: projectUpdated
					});
				});

			}else{
				fs.unlink(filePath, (err) => {
					return res.status(200).send({message: 'La extensión no es válida'});
				});
			}

		}else{
			return res.status(200).send({
				message: fileName
			});
		}

    },
    
    getImageFile: function(req, res) {
        var file = req.params.image;
        var path_file = './uploads/' + file;

        fs.exists(path_file, (exists) => {
            if(exists) {
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(200).send({
                    message: 'No existe la imagen'
                });
            }
        })
    }
};

module.exports = controller;


// return res.status(200).send({
//     project: project,
//     message: "Método saveProject"
// })