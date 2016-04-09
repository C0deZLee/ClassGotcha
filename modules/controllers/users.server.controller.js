'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    errorHandler = require('./errors.server.controller'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');
/**
 * Extend user's controller
 */
module.exports = _.extend(
    require('./users/users.authentication.server.controller'),
    require('./users/users.authorization.server.controller'),
    require('./users/users.password.server.controller'),
    require('./users/users.profile.server.controller')
);
