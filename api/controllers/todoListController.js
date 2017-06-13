'use strict';


var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks'),
  Message = mongoose.model('Message');

exports.list_all_tasks = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate(req.params.taskId, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {
  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

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
