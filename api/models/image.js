const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  img: {
    data: Buffer,
    contentType: String
  },
  date: {
    type: Date,
    required: true,
    get: function (val) {
      return val.toISOString().split('T')[0]
    }
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Image', ImageSchema);