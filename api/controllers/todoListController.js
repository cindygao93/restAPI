'use strict';

var mongoose = require('mongoose'),
  Message = mongoose.model('Message'),
  User = mongoose.model('User'),
  app = require('../../server'),
  jwt = require('jsonwebtoken');

exports.list_all_messages = function(req, res){
  Message.find({}, function(err, mess) {
    if (err)
      res.send(err);
    res.json(mess);
  });
};

exports.create_a_message = function (req, res){
  var newMess = new Message(req.body);
  newMess.save(function(err, mess) {
    if (err)
      res.send(err);
    res.json(mess);
  });
};

exports.determine_if_palindrome = function(req, res){
  Message.findById(req.params.messageId, function(err, mess) {
    if (err){
      res.send(err);
    } else {
      console.log(mess);
      if (isPalindrome(mess.message)){
        res.json({message: mess.message, isPalindrome: true});
      } else{
        res.json({message: mess.message, isPalindrome: false});
      }
    }
  });
};

function isPalindrome(messageStr){
  return messageStr == messageStr.split('').reverse().join('');
}

exports.delete_a_message = function(req, res){
  Message.remove({
    _id: req.params.messageId
  }, function(err, mess) {
    if (err)
      res.send(err);
    res.json({ message: 'Message successfully deleted' });
  });
};

exports.create_user = function(req, res){
  User.find({username: req.body.username}, function(err, user){
    if(err){
      res.send(err);
    };
    if(user.length > 0){
      console.log(user.length);
      res.send("username is already taken");
    } else {
      var newUser = new User(req.body);
      newUser.save(function(err, user){
        if (err){
          res.send(err);
        } else{
          res.json({created_user: true, user: user});
        }
      });
    };
  });
};

exports.show_all_users = function (req, res){
  User.find({}, function(err, user){
    if(err)
      res.send(err);
    res.json(user);
  });
};


//function that generates tokens
exports.check_auth = function(req, res){
  console.log("i am here")
  console.log(req.body);
  User.findOne({
    username: req.body.username
  }, function(err, user) {

    if (err) throw err;
    console.log(user);
    console.log(!user)
    if (!user) {
          console.log("one")
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      console.log("two");

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
          console.log("logic");
        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }

  });
};

//function that checks for a token
exports.check_for_token = function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
  }
};