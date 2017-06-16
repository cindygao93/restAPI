var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  passport = require('passport'),
  flash    = require('connect-flash'),
  bodyParser = require('body-parser'),
  morgan       = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser   = require('body-parser'),
  session      = require('express-session'),
  localStrategy   = require('passport-local').Strategy;


  //database models
  Task = require('./api/models/todoListModel'),
  Message = require('./api/models/messageModel'),
  User = require('./api/models/userModel');
  
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


///the following is new!!!
// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// -------------------------
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

// =========================================================================
// LOCAL SIGNUP ============================================================
// =========================================================================
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'

passport.use('local-signup', new localStrategy({
    // by default, local strategy uses username and password, we will override with email
    passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, username, password, done) {
    // asynchronous
    // User.findOne wont fire unless data is sent back
    process.nextTick(function() {

    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    User.findOne({ 'username' :  username }, function(err, user) {
        // if there are any errors, return the error
        if (err)
            return done(err);

        // check to see if theres already a user with that email
        if (user) {
            return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
        } else {

            // if there is no user with that email
            // create the user
            var newUser = new User();

            // set the user's local credentials
            newUser.username = username;
            newUser.password = password;

            // save the user
            newUser.save(function(err) {
                if (err)
                    throw err;
                return done(null, newUser);
            });
        }
    });    

    });
}));

passport.use('local-login', new localStrategy({
        // by default, local strategy uses username and password, we will override with email
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'username' :  username }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, user);
        });

    }));
// -------------------------------------

var routes = require('./api/routes/todoListRoutes');
routes(app,passport);


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);

