'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  username: {
    type: String,
    required: true
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

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return password === this.password;
};

module.exports = mongoose.model('User', UserSchema);