'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function (app) {
    // User Routes
    var users = require('../../app/controllers/users.server.controller');

    app.all('/*', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
        next();
    });

    // Setting up the users profile api
    app.route('/users/me').get(users.me);
    app.route('/users').put(users.update);
    app.route('/users/accounts').delete(users.removeOAuthProvider);


    // Setting up the users password api
    app.route('/users/password').post(users.changePassword);
    app.route('/auth/forgot').post(users.forgot);
    app.route('/auth/reset/:token').get(users.validateResetToken);
    app.route('/auth/reset/:token').post(users.reset);

    // Setting up the users authentication api
    app.route('/auth/signup').post(users.signup);
    app.route('/auth/signin').post(users.signin);
    app.route('/auth/signout').get(users.signout);

    // Our api (to change the default api)
    // open to everyone
    app.get('/api/0.1/user/logout', users.signout);
    app.route('/api/0.1/user/signup').post(users.signup);
    app.route('/api/0.1/user/signin').post(users.signin);

    app.get('/api/0.1/user/me', users.me);

    app.get('/api/v1/user/me/avatar', function(req, res) {});
    app.post('/api/v1/user/me/avatar', users.uploadAvatar);

    app.get('/api/0.1/user/me/moments', function (req, res) {
        //TODO:
    });
    // I dont find any id for moments, maybe this need to be fixed
    app.get('/api/0.1/user/me/moments/:id', function (req, res) {
        //TODO:
    });
    // We just search in the notes database?
    app.get('/api/0.1/user/me/notes', function (req, res) {
        //TODO:
    });
    app.get('/api/0.1/user/me/notes/:id', function (req, res) {
        //TODO:
    });

    // admin api
    app.get('/api/0.1/user/all', users.hasAuthorization(['admin']), users.getAll);
    app.get('/api/0.1/user/:id', users.hasAuthorization(['admin']), users.getOne);
    app.put('/api/0.1/user/:id', users.hasAuthorization(['admin']), users.update);
    app.post('/api/0.1/user', users.hasAuthorization(['admin']), users.create);
    app.delete('/api/0.1/user/:id', users.hasAuthorization(['admin']), users.delete);

    app.get('/api/0.1/user/:id/moments', function (req, res) {
        res.send(req.params.id);
        //TODO:
    });

    app.get('/api/0.1/user/:id/moments/:id2', function (req, res) {
        res.send(req.params.id);
        //TODO:
    });
    app.get('/api/0.1/user/:id/dues', function (req, res) {//user's due (all)
        res.send(req.params.id);
        //TODO:
    });
    app.get('/api/0.1/user/:id/dues/:id2', function (req, res) {
        res.send(req.params.id);
        //TODO:
    });
    app.get('/api/0.1/user/:id/notes', function (req, res) {
        res.send(req.params.id);
        //TODO:
    });
    app.get('/api/0.1/user/:id/notes/:id2', function (req, res) {
        res.send(req.params.id);
        //TODO:
    });

    // Setting the facebook oauth routes
    //app.route('/auth/facebook').get(passport.authenticate('facebook', {
    //	scope: ['email']
    //}));
    //app.route('/auth/facebook/callback').get(users.oauthCallback('facebook'));

    // Setting the twitter oauth routes
    //app.route('/auth/twitter').get(passport.authenticate('twitter'));
    //app.route('/auth/twitter/callback').get(users.oauthCallback('twitter'));

    // Setting the google oauth routes
    //app.route('/auth/google').get(passport.authenticate('google', {
    //	scope: [
    //		'https://www.googleapis.com/auth/userinfo.profile',
    //		'https://www.googleapis.com/auth/userinfo.email'
    //	]
    //}));
    //app.route('/auth/google/callback').get(users.oauthCallback('google'));

    // Setting the linkedin oauth routes
    //app.route('/auth/linkedin').get(passport.authenticate('linkedin'));
    //app.route('/auth/linkedin/callback').get(users.oauthCallback('linkedin'));

    // Setting the github oauth routes
    //app.route('/auth/github').get(passport.authenticate('github'));
    //app.route('/auth/github/callback').get(users.oauthCallback('github'));

    // Finish by binding the user middleware
    // app.param('userId', users.userByID);
};
