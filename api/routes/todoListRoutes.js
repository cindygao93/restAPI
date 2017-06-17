'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/todoListController'),
  mongoose = require('mongoose'),
  Message = mongoose.model('Message'),
  User = mongoose.model('User');

  app.route('/signup')
    .post(todoList.create_user)

  app.route('/logout')
    .get(todoList.logout)

  app.route('/users')
    .get(todoList.show_all_users)

  // app.route('/auth')
  //   .post(todoList.check_auth)

  app.post('/auth', function(req, res){
      var username = req.body.username;
      var pass = req.body.password;
      User.findOne({username: username, password: pass}, function(err, user){
        if(err){
          return res.json(err);
        }
        if(!user){
          return res.json({ success: false, message: 'Authentication failed. User not found.' });
        }
        req.session.user = user;
        console.log(req.session);
        console.log(req.session.id);
        return res.json({ success: true, message: 'Authentication succeeded. You can now view your messages' })
      })
    });

  app.get('/messages', function(req, res){
    if(req.session.user){
        Message.find({}, function(err, mess) {
        if (err)
          res.send(err);
        res.json(mess); 
        })
    } else{
      res.json({success: false, message: 'you are not logged in'});
    }
    console.log(req.session);
    console.log(req.session.id);
  });
    // .get(todoList.check_logged_in, todoList.list_all_messages)
    app.post('/messages',todoList.check_logged_in, todoList.create_a_message)


  app.route('/messages/:messageId')
    .get(todoList.check_logged_in, todoList.determine_if_palindrome)
    .delete(todoList.check_logged_in, todoList.delete_a_message)

  app.get('/', function(req, res){
     if(req.session.page_views){
        req.session.page_views++;
        res.send("You visited this page " + req.session.page_views + " times");
     } else {
        req.session.page_views = 1;
        res.send("Welcome to this page for the first time!");
     }
     console.log(req.session);
     console.log(req.session.id);
  });
};



