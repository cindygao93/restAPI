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

exports.delete_a_message = function(req, res){
  Message.remove({
    _id: req.params.messageId
  }, function(err, mess) {
    if (err)
      res.send(err);
    res.json({ message: 'Message successfully deleted' });
  });
};

exports.show_all_users = function (req, res){
  User.find({}, function(err, user){
    if(err)
      res.send(err);
    res.json(user);
  });
};

exports.create_user = function(passport){
  passport.authenticate('local-signup', {
  successRedirect : '/profile', // redirect to the secure profile section
  failureRedirect : '/signup', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
});
};

exports.show_login = function(req, res){
    res.send("this is the login page");
};

exports.login = function(req, res){

};

exports.show_signup = function(req, res){
    res.send("this is the sign up page");
};

exports.logout = function(req, res){
    req.logout();
    res.redirect('/login');
};

exports.render_homepage = function(req, res, next){
    isLoggedIn(req, res, next);
    // res.json({message: "the user is logged in", user: req.user });
}

function isPalindrome(messageStr){
  return messageStr == messageStr.split('').reverse().join('');
};


exports.isLoggedIn = function(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

