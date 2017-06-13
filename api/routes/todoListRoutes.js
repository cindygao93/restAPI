'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/todoListController');


  // todoList Routes
  app.route('/tasks')
    .get(todoList.list_all_tasks)
    .post(todoList.create_a_task);


  app.route('/tasks/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);


  app.route('/messages')
  	.get(todoList.list_all_messages)
  	.post(todoList.create_a_message)


  app.route('/messages/:messageId')
  	.get(todoList.determine_if_palindrome)
  	.delete(todoList.delete_a_message)
};