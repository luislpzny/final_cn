
const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  nombre: String,
  precio: String,
  descripcion: String
});


module.exports = mongoose.model('productos', productSchema);