'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var NoteSchema = new mongoose.Schema({
	title: String,
	type: String,
	file: {
		data: Buffer,
		contentType: String
	},
	author: String,
// rate = num/count
	rate: {
		count: Number,
		num: Number
	},
	create: {
		type: Date,
		default: Date.now
	},
	update: {
		type: Date,
		default: Date.now
	}
});
mongoose.model('Note', NoteSchema);
