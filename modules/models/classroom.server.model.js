'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ClassRoomSchema = new mongoose.Schema({
	name: String,
	classCode: Number,
	category: String,//Math
	number: Number,

	professor: {
		type: Schema.Types.ObjectId, 
		ref: 'Professor'
		},
	syllabus: {
		data:Buffer,
		contentType:String
	},
	students: [{
		type: Schema.Types.ObjectId, 
		ref: 'User'
	}],	
	notes: [{
		type: Schema.Types.ObjectId, 
		ref: 'Note'
	}],
	due: [{
		lastEditor: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		title: String,
		type: String,
		description: String,
		dueDate: Date,
		file: {
			data:Buffer,
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
	}],
	courseChat: {
		type: Schema.Types.ObjectId, 
		ref: 'Chat'
	},
	created: { 
		type: Date, 
		default: Date.now 
	},
	updated: {
		type: Date,
		default: Date.now
	}
	
});

mongoose.model('Classroom',ClassRoomSchema);
