'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MessageSchema = new Schema({
  Created_date: {
    type: Date,
    default: Date.now
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
  }
});

module.exports = mongoose.model('Message', MessageSchema);