const { Schema, model } = require('mongoose');

const productSchema =  new Schema({
  imageURL: String,
  title: String,
  description: String,
  price: Number,
  stock: Number,
  category: Array,
},
{
  timestamps: true,
  versionKey: false
});

module.exports = model('Product', productSchema);