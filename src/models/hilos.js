
const mongoose = require('mongoose');

const { Schema } = mongoose;

const hiloschema = new Schema({
  nombre: String,
  precio: String,
  descripcion: String,
  respuestas:{
    res_usuario: String,
    res_respuesta:String,
    res_titulo:String,
    res_contenido: String
},
  
});


module.exports = mongoose.model('hilos', hiloschema);