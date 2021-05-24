const { Schema, model } = require('mongoose');

const brandSchema = new Schema({
  imageURL: String
},
{
  versionKey: false
});

module.exports = model('Brand', brandSchema);