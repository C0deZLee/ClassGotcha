'use strict';

var _ = require('lodash'),
	errorHandler = require('./errors.server.controller'),
	mongoose = require('mongoose'),
	Prof = mongoose.model('Professor');

/**
 * Function for verify the existence of classroom
 * @param id: The id of classroom model
 */
var profByID = function(id) {
	Prof.findOne({
		_id: id
	}).exec(function(err, professor) {
		if (err) return false;
		if (!professor) return false;
		return professor;
	});
};

/**
 * Creat new professor
 * @param id: The id of professor model
 */
exports.create = function(req, res) {
	// Init Variables
	var professor = new Prof(req.body);

	professor.save(function(err) {
		if(err) {
			return res.status(400).send(err);
		}
		else {
			return res.json(professor);
		}
	});

}
/**
 * Update professor
 * @param id: The id of professor model
 */
exports.update = function(req, res){
	//Init Vairables
	var professor = profByID(req.params.id);

	// If class room exist
	if (professor) {
		// Update it
		professor = _.extend(professor, req.body);
		professor.update = Date.now();

		professor.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				return res.json(professor);
			}
		});

	} else {
		res.status(400).send({
			message: 'Professor does not exist'
		});
	}

}

/**
 * Delete professor
 * @param id: The id of professor model
 */
exports.remove = function(req, res) {
	//Init Vairables
	var professor = profByID(req.params.id);

	// If professor exist
	if(professor) {
		// Remove it
		professor.remove(function(err) {
			if(err) {
				return res.status(400).send(err);
			}
			else {
				return res.json(professor);
			}
		});

	} else {
		res.status(400).send({
			message: 'Professor does not exist'
		});
	}
}

/**
 * Add a rate to professor
 * @param id: The id of professor model
 */
exports.addRate = function(req, res) {
	//Init Vairables
	var professor = profByID(req.params.id);

	// If professor exist
	if(professor) {
		// Push new rate to professor's rate sub-doc
		professor.rate.push(req.body);

		professor.save(function(err) {
			if(err) {
				return res.status(400).send(err);
			}
			else {
				return res.json(professor);
			}
		});

	} else {
		res.status(400).send({
			message: 'Professor does not exist'
		});
	}
}


/**
 * Update a rate of professor
 * @param id: The id of professor model
 */
exports.updateRate = function(req, res) {
	//Init Vairables
	var professor = profByID(req.params.id);

	// If professor exist
	if(professor) {
		// Find the rate created by current user
		var rate = professor.rate.filter(function (rate) {
			// TODO: Need to find a way to compare the current user
			return rate.user === req.user;
		}).pop();

		if (rate) {
			rate = _.extend(req.body);
			rate.update = Date.now();

			rate.save(function(err) {
				if(err) {
					return res.status(400).send(err);
				}
				else {
					return res.json(professor);
				}
			});
		} else {
			res.status(400).send({message: 'You have not rate this prof yet'});
		}
	} else {
		res.status(400).send({
			message: 'Professor does not exist'
		});
	}
}


/**
 * Add a class to professor's class sub-doc (Classes this prof teaching)
 * @param id: The id of professor model
 * @param class The id of the class need to be added
 */
exports.addClass = function(req, res) {
	var professor = profByID(req.params.id);
	// TODO : user validation
	if (professor){
		// TODO : req.params.class validation?
		professor.course.push(req.req.params.class);

		professor.save(function(err) {
			if(err) {
				return res.status(400).send(err);
			}
			else {
				return res.json(professor);
			}
		});

	} else {
		res.status(400).send({
			message: 'Professor does not exist'
		});
	}
}

/**
 * Remove a class to professor's class sub-doc (Classes this prof teaching)
 * @param id: The id of professor model
 * @param class The id of the class need to be added
 */
exports.removeClass = function(req, res) {
	var professor = profByID(req.params.id);
	// TODO : user validation
	if (professor){
		// TODO : req.params.class validation?
		var temp_index = professor.course.indexOf(req.params.class);
		if (temp_index)
		professor.course.splice(temp_index,1);

		professor.save(function(err) {
			if(err) {
				return res.status(400).send(err);
			}
			else {
				return res.json(professor);
			}
		});

	} else {
		res.status(400).send({
			message: 'Professor does not exist'
		});
	}
}

/**
 * Get all Prof Objects
 */
exports.getAll = function(req, res) {
	Prof.find({}, function (err, profs) {
		if (err) {
			return res.status(500).send(err);
		} else {
			return res.json(profs);
		}
	});
}

/**
 * Get Prof by ID
 */
 exports.getOne = function(req, res) {
	//Init Vairables
 	var prof = profByID(req.params.id);

 	if (prof) {
 		return res.json(prof);
 	} else {
 		return res.status(400).send({
			message: 'Professor does not exist'
		});
 	}
 }
