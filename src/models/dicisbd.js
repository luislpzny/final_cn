
const mongoose = require('mongoose');

const { Schema } = mongoose;

const dicisschema = new Schema({
  nombre: String,
  precio: String,
  descripcion: String
});


module.exports = mongoose.model('dicisbd', dicisschema);