'use strict';

var mongoose = require('mongoose'),
  Message = mongoose.model('Message'),
  User = mongoose.model('User');

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
  User.findOne({
    username: req.body.username
  }, function(err, user) {

    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        // if user is found and password is right
        req.session.isAuthenicated = true;
        req.session.user = user;
        console.log(req.session);
        console.log(req.session.id);
        res.json({ success: true, message: 'Authentication succeeded. You can now view your messages' })
      }
    }
  });
};



exports.check_logged_in = function(req, res){
  console.log(req.session);
        console.log(req.session.id);
  if(req.session.isAuthenicated){
      res.end()
  } else{
      res.json({ success: false, message: 'You do not have permission to access this. Please login.' }); 
  }
};

exports.logout = function(req, res){
  req.session.destroy();
  res.json({message: "you have logged out"});
}


