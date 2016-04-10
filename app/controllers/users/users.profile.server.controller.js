'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
    uuid = require('uuid'), // https://github.com/defunctzombie/node-uuid
    multiparty = require('multiparty'), // https://github.com/andrewrk/node-multiparty
    s3 = require('s3'), // https://github.com/andrewrk/node-s3-client
    User = mongoose.model('User');

/**
 * This is a local function userByID for look up users, not the middleware
 * The middleware userByID is in users.authorization.server.controller.js
 */
var userByID = function (id) {
	User.findOne({
		_id: id
	}).exec(function (err, user) {
		if (err) {
			res.status(500).send(err);
		}
		else if (!user) {
			res.status(404).send({message: 'User does not exist'});
		}
		return user;
	});
};

/**
 * init a s3Client for file upload
 */
var s3Client = s3.createClient({
    key: 'steveleelx',
    secret: 'AmazonIamsteve18',
    bucket: 'elasticbeanstalk-us-west-2-611212426196'
});

/**
 * Create an account from backend
 */
exports.create = function(req, res) {
	// Init Variables
	var user = new User(req.body);

	// Add missing user fields
	user.provider = 'local';

	// Then save the user
	user.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
	});
};

/**
 * Update user details
 */
exports.update = function (req, res) {
	// init var
	var user = userByID(req.params.id);

	if (user){
		// For security measurement we remove the roles from the req.body object
		delete req.body.roles;
		user.password = undefined;
		user.salt = undefined;

		// Merge existing user
		user = _.extend(user, req.body);
		user.updated = Date.now();

		user.save(function (err) {
			if (err) {
				return res.status(400).send({
					message: err
				});
			} else {
				// If user is changing self data, re-login
				if(req.params.id === req.user.id){
					req.login(user, function(err) {
						if (err) {
							res.status(400).send(err);
						} else {
							res.json(user);
						}
					});
				}
			}
		});
	}
};

/**
 * Delete user account
 */
exports.delete = function(req, res) {
	// init var
	var user = userByID(req.params.id);

	if (user){
		user.remove(function(err) {
			if(err) {
				return res.status(400).send(err);
			}
			else {
				return res.json(user);
			}
		});
	}
};


/**
 * Get users all moments by ID
 */
exports.getAllMoments = function (req, res) {
	var user = userByID(req.params.id)
	if (user) {
		return res.json(user.moment)
	} else {
		res.status(400).send({
			message: 'User does not exist'
		});
	}
}

/**
 * Add moment to the current user
 */
exports.addMoment = function(req, res) {
	// Init Variables
	var user = req.user;

	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	if (user) {
		//Push the Moment to User
		user.moment.push(req.body);

		// TODO: moment contains img, so we need to deal with that later on.
		user.save(function(err) {
			if (err) {
				return res.status(400).send(err);
			}
			else {
				return res.json(moment);
			}
		});
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};

/**
 * Delete moment from the current user
 * @param id: the id of the moment
 */
 exports.deleteMoment = function(req, res, id) {
	// Init Variables
	var user = req.user;

	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	if (user) {
		// Find the moment by id and delete it
		var moment = user.moment.id(id).delete();

		user.save(function(err) {
			if (err) {
				return res.status(400).send(err);
			}
			else {
				return res.json(moment);
			}
		});
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
 };

/**
 * Send current user's info
 */
exports.me = function(req, res) {
	return res.json(req.user || null);
};

/**
 * Get all users Objects
 */
exports.getAll = function(req, res) {
	User.find({}, function (err, users) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.json(users);
		}
	});
};

/**
 * Get users by ID
 */
exports.getOne = function(req, res) {
	// init var
     var user = new User(req.body);
	 res.json(user);
 };

exports.uploadAvatar = function(req, res) {
	var form = new multiparty.Form();
    form.parse(req, function(err, fields) {

        var buf = new Buffer(fields.file[0].replace(/^data:image\/\w+;base64,/, ""),'base64');
        var destPath = '/' + user.id + '/profile/avatar.png';
        var data = {
            Key: user.id,
            Body: buf,
            ContentEncoding: 'base64',
            ContentType: 'image/png'
        };

        var headers = {
            'x-amz-acl': 'public-read',
            'Content-Length': buf.length,
            'Content-Type': 'image/png'
        };
        var s3Client = s3.createClient({
		    key: 'steveleelx',
		    secret: 'AmazonIamsteve18',
		    bucket: 'elasticbeanstalk-us-west-2-611212426196'
		});

        var uploader = s3Client.upload(file.path, destPath, headers);

        uploader.on('error', function(err) {
			res.status(500).send(err);
            //TODO handle this
        });

        uploader.on('end', function(url) {
            //TODO do something with the url
            console.log('file opened:', url);
        });
    });
};