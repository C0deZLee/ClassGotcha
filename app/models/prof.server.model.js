'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Schema declaration.
 */
var ProfSchema = new mongoose.Schema({
	name: String,
	department: String,
	course: [{
		type: Schema.Types.ObjectId, 
		ref: 'Course'
	}],
	rate: [RateSchema],
	avatar: {
		data: Buffer,
		contentType: String
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

/**
 * For allow user to update their rate, we need to find rate by id
 * so we declare rate separately.
 */
 var RateSchema = new mongoose.Schema({
	star: Number,
	comment: String,
	user: {
		type: Schema.Types.ObjectId, 
		ref: 'User'
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
 
mongoose.model('Professor',ProfSchema);