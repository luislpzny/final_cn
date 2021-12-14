const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/escuela') //para mongo en caso de estar sin docker
//mongoose.connect('mongodb://mongo/escuela')
    .then(db => console.log('BASE DE DATOS CONECTADA', db.connection.host))
    .catch(err => console.error(err));