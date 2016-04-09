'use strict';

module.exports = function(app) {
    // Routes
    var users = require('../../app/controllers/users.server.controller');
    var prof = require('../../app/controllers/prof.server.controller');
 
    //----professor----
    app.get('/api/0.1/prof/all', users.hasAuthorization(['admin']), prof.getAll);

    app.get('/api/0.1/prof/:id', prof.getOne);
    app.post('/api/0.1/prof', users.hasAuthorization(['admin']), prof.create);
    app.put('/api/0.1/prof/:id', users.hasAuthorization(['admin']), prof.update);
    app.delete('/api/0.1/prof/:id', users.hasAuthorization(['admin']), prof.remove);

    app.post('/api/0.1/prof/:id/class', users.hasAuthorization(['admin']), prof.addClass);
    app.delete('/api/0.1/prof/:id/class', users.hasAuthorization(['admin']), prof.removeClass);

    app.post('/api/0.1/prof/:id/rate', users.hasAuthorization(['user']), prof.addRate);
    app.put('/api/0.1/prof/:id/rate', users.hasAuthorization(['user']), prof.updateRate);
}