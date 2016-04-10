'use strict';

var _ = require('lodash'),
	errorHandler = require('./errors.server.controller'),
	mongoose = require('mongoose'),
	Classroom = mongoose.model('Classroom');

/**
 * Function for verify the existence of classroom
 * @param id The id of classroom model
 */
var classroomByID = function(id) {
	Classroom.findOne({
		_id: id
	}).exec(function(err, classroom) {
		//if (err) return false;
		if (!classroom) return false;
		return classroom;
	});
};

/**
 * Create classroom
 * @param id The id of classroom model
 */
exports.create = function(req, res) {
	// Init Variables
	var classroom = new Classroom(req.body);
	// TODO:When create classroom, if the professor doesn’t exist, we should create a prof first
	classroom.save (function(err) {
		if (err) {
			return res.status(400).send(err);
		}
		else {
			return res.json(classroom);
		}
	});
}

/**
 * Update classroom
 * @param id The id of classroom model
 */
exports.update = function(req, res){
	//Init Vairables
	console.log(req.params.id);
	var classroom = classroomByID(req.params.id);

	// If class room exist
	if (classroom) {
		// Update it
		classroom = _.extend(classroom, req.body);
		classroom.update = Date.now();

		classroom.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				return res.json(classroom);
			}
		});

	} else {
		res.status(400).send({
			message: 'Classroom does not exist'
		});
	}
}

/**
 * Delete classroom
 * @param id The id of classroom model
 */
exports.remove = function(req, res) {
	//Init Vairables
	var classroom = classroomByID(req.params.id);

	// If classroom exist
	if (classroom) {
		// Remove it
		classroom.remove(function(err) {
			if(err) {
				return res.status(400).send(err);
			}
			else {
				return res.json(classroom);
			}
		});

	} else {
		res.status(400).send({
			message: 'Classroom does not exist'
		});
	}
}

/**
 * Add a due to classroom
 * @param id The id of classroom model
 */
exports.addDue = function(req, res) {
	//Init Vairables
	var classroom = classroomByID(req.params.id);

	// If classroom exist
	if (classroom) {
		// Push due to classroom's due sub-doc
		classroom.due.push(req.body);
		classroom.update = Date.now();

		classroom.save(function(err) {
			if(err) {
				return res.status(400).send(err);
			}
			else {
				return res.json(classroom);
			}
		});

	} else {
		res.status(400).send({
			message: 'Classroom does not exist'
		});
	}
}

/**
 * Return all dues of a classroom
 * @param id The id of classroom model
 */
exports.getDues = function(req, res) {
	var classroom = classroomByID(req.params.id);

	if (classroom) {
		// Get all dues from this classroom
		return res.json(classroom.due);


	} else {
		res.status(400).send({
			message: 'Classroom does not exist'
		});
	}

}

/**
 * Add ONE student to classroom
 * @param id The id of classroom model
 */
exports.addStudent = function(req, res) {
	var classroom = classroomByID(req.params.id);

	if (classroom) {
		classroom.students.push(req.body);
		classroom.update = Date.now();

		classroom.save(function(err) {
			if(err) {
				return res.status(400).send(err);
			}
			else {
				return res.json(classroom);
			}
		});

	} else {
		res.status(400).send({
			message: 'Classroom does not exist'
		});
	}
}

/**
 * Return all students of the classroom
 * @param id The id of classroom model
 */
exports.getStudents = function(req, res) {
	var classroom = classroomByID(req.params.id);

	if (classroom) {
		// Get all dues from this classroom
		return res.json(classroom.students);


	} else {
		res.status(400).send({
			message: 'Classroom does not exist'
		});
	}
}

/**
 * Add ONE note to classroom
 * @param id The id of classroom model
 */
exports.addNote = function(req, res) {
	var classroom = classroomByID(req.params.id);

	if (classroom) {
		classroom.notes.push(req.body);
		classroom.update = Date.now();

		classroom.save(function(err) {
			if(err) {
				return res.status(400).send(err);
			}
			else {
				return res.json(classroom);
			}
		});

	} else {
		res.status(400).send({
			message: 'Classroom does not exist'
		});
	}
}

/**
 * Return all notes of the classroom
 * @param id The id of classroom model
 */
exports.getNotes = function(req, res) {
	var classroom = classroomByID(req.params.id);

	if (classroom) {
		// Get all dues from this classroom
		return res.json(classroom.notes);


	} else {
		res.status(400).send({
			message: 'Classroom does not exist'
		});
	}
}

/**
 * Get all Classroom Objects
 */
exports.getAll = function(req, res) {
	Classroom.find({}, function (err, classrooms) {
		if (err) {
			return res.status(500).send(err);
		} else {
			return res.json(classrooms);
		}
	});
}

/**
 * Get Classroom by ID
 */
 exports.getOne = function(req, res) {
 	var classroom = classroomByID(req.params.id);

 	if (classroom) {
 		return res.json(classroom);
 	} else {
 		return res.status(400).send({
			message: 'Classroom does not exist'
		});
 	}
 }

 /**
  * Get Classroom by ID
  */
  exports.getInfo = function(req, res) {
  	// TODO: This function should return the basic info of class, not the whole class instance
  	var classroom = classroomByID(req.params.id);

  	if (classroom) {
  		return res.json(classroom);
  	} else {
  		return res.status(400).send({
 			message: 'Classroom does not exist'
 		});
  	}
  }
