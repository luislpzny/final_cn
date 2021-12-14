
const mongoose = require('mongoose');

const { Schema } = mongoose;

const hiloschema = new Schema({
  res_usuario: String,
  res_hilo: String,
  res_post: String,
  res_nombre: String,
  res_contenido: String
});


module.exports = mongoose.model('respuestas', hiloschema);