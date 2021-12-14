
const mongoose = require('mongoose');

const { Schema } = mongoose;

const respuestadD = new Schema({
  res_usuario: String,
  res_hilo: String,
  res_post: String,
  res_nombre: String,
  res_contenido: String
});


module.exports = mongoose.model('respuestasD', respuestasD);