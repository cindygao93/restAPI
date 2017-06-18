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
  sender: { 
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  receiver: { 
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  }

});

module.exports = mongoose.model('Message', MessageSchema);