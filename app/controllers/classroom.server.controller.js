'use strict';

var _ = require('lodash'),
	errorHandler = require('./errors.server.controller'),
	mongoose = require('mongoose'),
	Classroom = mongoose.model('Classroom'),
	uuid = require('uuid'), // https://github.com/defunctzombie/node-uuid
	multiparty = require('multiparty'), // https://github.com/andrewrk/node-multiparty
	s3 = require('s3'); // https://github.com/andrewrk/node-s3-client

var client = s3.createClient({
  
  maxAsyncS3: 20,     // this is the default
  s3RetryCount: 3,    // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 20971520, // this is the default (20 MB)
  multipartUploadSize: 15728640, // this is the default (15 MB)
  s3Options: {
    accessKeyId: "steveleelx",
    secretAccessKey: "AmazonIamsteve18",
    region: "us-east-1",
    signatureVersion: "v3",
    // endpoint: 's3.yourdomain.com',
    sslEnabled: false
    // any other options are passed to new AWS.S3()
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
  },
});

/**
 * Function for verify the existence of classroom
 * @param id The id of classroom model
 */

var classroomByID = function(id) {
	Classroom.findOne({_id: id}).exec(function(err, classroom) {
		if (err) return err;
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
			return res.status(404).send(err);
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
		Classroom.findOne({_id: req.params.id}).exec(function(err, classroom) {
			if (err || !classroom) {
				res.status(404).send({
					message: 'Classroom does not exist'
				});
			} else {
			// Update it
			classroom = _.extend(classroom, req.body);
			classroom.update = Date.now();

			classroom.save(function(err) {
				if (err) {
					return res.status(404).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					return res.json(classroom);
				}
			});
		}
	});
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
				return res.status(404).send(err);
			}
			else {
				return res.json(classroom);
			}
		});

	} else {
		res.status(404).send({
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
				return res.status(404).send(err);
			}
			else {
				return res.json(classroom);
			}
		});

	} else {
		res.status(404).send({
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
		res.status(404).send({
			message: 'Classroom does not exist'
		});
	}

}

/**
 * Add ONE student to classroom
 * @param id The id of classroom model
 */
exports.addStudent = function(req, res) {
	Classroom.findOne({_id: req.params.id}).exec(function(err, classroom) {
		if (err || !classroom) {
			res.status(404).send({
				message: 'Classroom does not exist'
			});
		} else {
			classroom.students.push(req.body);
			classroom.update = Date.now();
			classroom.save(function(err) {
				if(err) return res.status(400).send(err);
				else return res.json(classroom);
			});

		}
	});
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



exports.uploadfile =function(req, res) {
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
      var file = files.file[0];
      var contentType = file.headers['content-type'];
      var extension = file.path.substring(file.path.lastIndexOf('.'));
      //var destPath = '/' + req.user.id + '/profile' + '/' + uuid.v4() + extension;
	var destPath = '/profile/img'+ extension;

      var headers = {
        'x-amz-acl': 'public-read',
        'Content-Length': file.size,
        'Content-Type': contentType
      };
      	
		var params = {
		  localFile: file.path,

		  s3Params: {
		    Bucket: "elasticbeanstalk-us-west-2-611212426196",
		    Key: destPath,
		    // other options supported by putObject, except Body and ContentLength.
		    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
		  },
		};
		var uploader = client.uploadFile(params);
	console.log("here");
     
      

      uploader.on('error', function(err) {
        //TODO handle this
	console.log(err);

      });
	console.log("here2");

      uploader.on('end', function(url) {
        //TODO do something with the url
        console.log('file opened:', url);
      });
	});
}
