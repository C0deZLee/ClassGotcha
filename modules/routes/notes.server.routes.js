'use strict';

module.exports = function(app) {
    var users = require('../../app/controllers/users.server.controller');
    var notes = require('../../app/controllers/notes.server.controller');
    //----Note----
    app.get('/api/0.1/notes/all', users.hasAuthorization(['admin']), notes.getAll);

    app.get('/api/0.1/notes/:id', notes.getOne);
    app.post('/api/0.1/notes', notes.create);
    app.delete('/api/0.1/notes/:id', notes.remove);
    app.put('/api/0.1/notes/:id', notes.update);

    // this part is not implemented yet
    app.get('/api/0.1/notes/:id/rate', notes.getRate);
    app.post('/api/0.1/notes/:id/rate', notes.addRate);
    //app.put('/api/0.1/notes/:id/rate', notes.updateRate);

}
