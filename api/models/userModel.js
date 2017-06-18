'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  }
  // sentMess: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  // receivedMess: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
});

module.exports = mongoose.model('User', UserSchema);