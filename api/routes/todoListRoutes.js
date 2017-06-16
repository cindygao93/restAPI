'use strict';
module.exports = function(app, passport) {
  var todoList = require('../controllers/todoListController');

  app.route('/messages')
  	.get(todoList.list_all_messages)
  	.post(todoList.create_a_message)


  app.route('/messages/:messageId')
  	.get(todoList.determine_if_palindrome)
  	.delete(todoList.delete_a_message)

  app.route('/users')
    .get(todoList.show_all_users)

  app.route('/login')
    .get(todoList.show_login)
    .post(passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        // failureFlash : true // allow flash messages
    }))

  app.route('/signup')
    .get(todoList.show_signup)
    .post(passport.authenticate('local-signup'), function(req, res) {
        // res.status(200).json({account_created: true, user: req.user});
        res.end();
        // res.redirect('/profile');
    })

  app.route('/logout')
    .get(todoList.logout)

  app.route('/profile')
    .get(isLoggedIn, function(req, res) {
       res.json({user : req.user}) // get the user out of session and pass to template
    })

  function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

};