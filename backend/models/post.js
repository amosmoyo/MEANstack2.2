const mongoose = require('mongoose');

let postSchema = new mongoose.Schema({
  title:{
    type: String, required: true
  },
  description: {
    type: String,
  },
  imagePath: {
    type: String, required: true
  }
});

module.exports = mongoose.model('POSTREDO4', postSchema);
