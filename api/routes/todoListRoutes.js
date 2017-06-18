'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/todoListController'),
  server = require('../../server'),
  mongoose = require('mongoose'),
  Message = mongoose.model('Message'),
  User = mongoose.model('User');

  app.route('/signup')
    .post(todoList.create_user)

  app.route('/logout')
    .get(todoList.logout)

  app.route('/users')
    .get(todoList.show_all_users)

  app.route('/auth')
    .post(todoList.check_auth)

  app.route('/messages')
    // .get(todoList.list_all_messages)
    .post(todoList.check_logged_in, todoList.create_a_message)
    .get(todoList.check_logged_in, todoList.list_all_messages)


  app.route('/messages/:messageId')
    .get(todoList.check_logged_in, todoList.determine_if_palindrome)
    .delete(todoList.check_logged_in, todoList.delete_a_message)

  app.route('/all')
    .get(todoList.list_all_messages_all_users)

};



