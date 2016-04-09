'use strict';

var _ = require('lodash'),
	errorHandler = require('./errors.server.controller'),
	mongoose = require('mongoose'),
	Note = mongoose.model('Note');

/**
 * Function for verify the existence of note
 * @param id: The id of note model
 */
var noteByID = function(id) {
	Note.findOne({
		_id: id
	}).exec(function(err, note) {
		if (err) {
			return false;
		}
		if (!note) {
			return false;
		}
		return note;
	});
};

/**
 * Creat new note
 * @param id: The id of note model
 */
exports.create = function(req, res) {
	// Init Variables
	var note = new Note(req.body);

	note.save(function(err) {
		if(err) {
			return res.status(400).send(err);
		}
		else {
			return res.json(note);
		}
	});

}
/**
 * Update note
 * @param id: The id of note model
 */
exports.update = function(req, res){
	//Init variable
	var note = noteByID(req.params.id);

	// If class room exist
	if (note) {
		// TODO: if admin then go on, if uesr then check the owner first
		// Update it
		note = _.extend(note, req.body);
		note.update = Date.now();

		note.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				return res.json(note);
			}
		});

	} else {
		res.status(400).send({
			message: 'Note does not exist'
		});
	}
}

/**
 * Delete note
 * @param id: The id of note model
 */
exports.remove = function(req, res) {
	//Init Vairables
	var note = noteByID(req.params.id);

	// If note exist
	if(note) {
		// TODO: if admin then go on, if uesr then check the owner first
		// Remove it
		note.remove(function(err) {
			if(err) {
				return res.status(400).send(err);
			}
			else {
				return res.json(note);
			}
		});

	} else {
		res.status(400).send({
			message: 'Note does not exist'
		});
	}
}

/**
 * get the rate of this note, it is just a number
 * @param id: The id of note model
 */
exports.getRate = function(req, res) {

  var note = noteByID(req.params.id);

	//If note exist
	if (note) {
		// TODO: if admin then go on, if uesr then check the owner first
		// Remove it
		return (note.rate.num/note.rate.count) //TODO: can I just return this ratio?

	} else {
		res.status(400).send({
			message: 'Note does not exist'
		});
	}
}

/**
 * Add a rate to note, it is just a number
 * @param id: The id of note model
 * @param num: the rate to add
 */
exports.addRate = function(req, res) {
	var note = noteByID(req.params.id);
	if (note) {
		// TODO: if admin then go on, if uesr then check the owner first
		// Remove it
		note.rate.count +=1;
		note.rate.num += req.params.num;
		note.update = Date.now();

		note.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				return res.json(note);
			}
		});
	} else {
		res.status(400).send({
			message: 'Note does not exist'
		});
	}
}

/**
 * Update a rate
 * @param id: The id of note model
 */
//exports.updateRate = function(req, res) {
	//res.status(500).send({
		//message: 'Not implementned'
	//});
	// TODO
//}

/**
 * Get all Notes Objects
 */
exports.getAll = function(req, res) {
	Note.find({}, function (err, notes) {
		if (err) {
			return res.status(500).send(err);
		} else {
			return res.json(notes);
		}
	});
}

/**
 * Get Notes by ID
 */
 exports.getOne = function(req, res) {
	//Init Vairables
 	var note = noteByID(req.params.id);

 	if (note) {
 		return res.json(note);
 	} else {
 		return res.status(400).send({
			message: 'Note does not exist'
		});
 	}
 }
