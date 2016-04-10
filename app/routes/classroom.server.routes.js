 'use strict';

module.exports = function(app) {
    // moudle denpendences
    var classroom = require('../../app/controllers/classroom.server.controller');
    var users = require('../../app/controllers/users.server.controller');

    app.get('/api/0.1/class/all', users.hasAuthorization(['admin']), classroom.getAll);

    app.get('/api/0.1/class/:id', users.hasAuthorization(['user']), classroom.getOne);
    app.get('/api/0.1/class/:id/info', classroom.getInfo);
    app.post('/api/0.1/class/', users.hasAuthorization(['admin']), classroom.create);
    app.put('/api/0.1/class/:id', users.hasAuthorization(['admin']), classroom.update);
    app.delete('/api/0.1/class/:id/', users.hasAuthorization(['admin']), classroom.remove);

    app.get('/api/0.1/class/:id/students', users.hasAuthorization(['user']), classroom.getStudents);
    app.post('/api/0.1/class/:id/students', users.hasAuthorization(['user']), classroom.addStudent);

    app.get('/api/0.1/class/:id/notes', users.hasAuthorization(['user']), classroom.getNotes);
    app.post('/api/0.1/class/:id/notes', users.hasAuthorization(['user']), classroom.addNote);

    app.get('/api/0.1/class/:id/dues', users.hasAuthorization(['user']), classroom.getDues);
    app.post('/api/0.1/class/:id/dues', users.hasAuthorization(['user']), classroom.addDue);
    app.post('/api/0.1/upload/image',users.hasAuthorization(['user']),classroom.uploadfile); 
    app.post('/api/0.1/download/image',users.hasAuthorization(['user']),classroom.downloadfile);
}