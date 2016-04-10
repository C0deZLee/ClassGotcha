'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ChatSchema= new mongoose.Schema({
	roomName:{
		type: String,
		default: "Chat"
	},

	member: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}],
	messages: [{
		file: {
			data: Buffer,
			contentType: String
		},
		text: String,
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		create:{
			type: Date,
			default: Date.now
		}
	}],

	create:{
		type: Date,
		default: Date.now
	}

});
mongoose.model('Chat',ChatSchema);
