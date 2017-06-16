'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/todoListController'),
  mongoose = require('mongoose'),
  Message = mongoose.model('Message'),
  User = mongoose.model('User');

  app.route('/signup')
    .post(todoList.create_user)

  app.route('/users')
    .get(todoList.show_all_users)

  // app.post('/auth', function(req, res){
  // console.log("i am here")
  // console.log(req.body);
  // User.findOne({
  //   username: req.body.username
  // }, function(err, user) {

  //   if (err) throw err;
  //   console.log(user);
  //   console.log(!user)
  //   if (!user) {
  //         console.log("one")
  //     res.json({ success: false, message: 'Authentication failed. User not found.' });
  //   } else if (user) {
  //     console.log("two");

  //     // check if password matches
  //     if (user.password != req.body.password) {
  //       res.json({ success: false, message: 'Authentication failed. Wrong password.' });
  //     } else {
  //         console.log("logic");
  //       // if user is found and password is right
  //       // create a token
  //       var token = jwt.sign(user, app.get('superSecret'), {
  //         expiresIn: 1440 // expires in 24 hours
  //       });

  //       // return the information including token as JSON
  //       res.json({
  //         success: true,
  //         message: 'Enjoy your token!',
  //         token: token
  //       });
  //     }   

  //   }})}) 

  app.route('/auth')
    .post(todoList.check_auth);


// // route middleware to verify a token
//   app.use(function(req, res, next) {

//   // check header or url parameters or post parameters for token
//   var token = req.body.token || req.query.token || req.headers['x-access-token'];

//   // decode token
//   if (token) {

//     // verifies secret and checks exp
//     jwt.verify(token, app.get('mySecret'), function(err, decoded) {      
//       if (err) {
//         return res.json({ success: false, message: 'Failed to authenticate token.' });    
//       } else {
//         // if everything is good, save to request for use in other routes
//         req.decoded = decoded;    
//         next();
//       }
//     });

//   } else {

//     // if there is no token
//     // return an error
//     return res.status(403).send({ 
//         success: false, 
//         message: 'No token provided.' 
//     });

//   }
// });

 app.route('/messages')
    .get(todoList.check_for_token, todoList.list_all_messages)
    .post(todoList.check_for_token, todoList.create_a_message)


  app.route('/messages/:messageId')
    .get(todoList.check_for_token, todoList.determine_if_palindrome)
    .delete(todoList.check_for_token, todoList.delete_a_message)
};