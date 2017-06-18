'use strict';

var mongoose = require('mongoose'),
  server = require('../../server'),
  Message = mongoose.model('Message'),
  User = mongoose.model('User');

exports.list_all_messages_all_users = function(req, res){
    Message.find({}, function(err, mess) {
      if (err)
        res.send(err);
      res.json(mess);
    });
};

exports.list_all_messages = function(req, res){
    Message.find({receiver: server.session.user._id}, function(err, mess) {
      if (err)
        res.send(err);
      res.json(mess);
    });
};

exports.create_a_message = function (req, res){

  console.log(req.body);

  User.findById(req.body.receiver, function(err, user){
    if(err){
      console.log(err);
      res.json("user you are sending to does not exist");
    } else{
      console.log("user exists");
        delete req.body.receiver;
        req.body.receiver = user._id;
        req.body.sender = server.session.user._id;
        console.log(user);
        var newMess = new Message(req.body);
        newMess.save(function(err, mess) {
          if (err){
            res.send(err);
          }
          res.json(mess);
        });
      }
    })
  };


exports.determine_if_palindrome = function(req, res){
  Message.findOne({receiver: server.session.user._id, _id: req.params.messageId}, function(err, mess) {
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
  Message.findOneAndRemove({ _id: req.params.messageId, receiver: server.session.user._id},
  function(err, mess) {
    if (err){
      res.send(err);
    }
    else if(mess){
      res.json({ status: 'Message successfully deleted', message: mess });
    }
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
  var username = req.body.username;
  var pass = req.body.password;
  User.findOne({username: username, password: pass}, function(err, user){
    if(err){
      return res.json(err);
    }
    if(!user){
      return res.json({ success: false, message: 'Authentication failed. User does not exist or password is wrong.' });
    }
    server.session.user = user;
    console.log('customSession:' + JSON.stringify(server.session));
    return res.json({ success: true, message: 'Authentication succeeded. You can now view your messages' })
  })
};

exports.check_logged_in = function(req, res, next){
  if(server.session.user){
    next();
  } else{
      res.json({ success: false, message: 'You do not have permission to access this. Please login.' }); 
  }
};

exports.logout = function(req, res){
  if(server.session.user){
    server.session = {};
    res.json({success: true, message: 'you have logged out'});
  }
  else{
    res.redirect('/');
  }
}


