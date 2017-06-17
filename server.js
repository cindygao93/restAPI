var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  morgan = require('morgan'),
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'),
  Message = require('./api/models/messageModel'),
  User = require('./api/models/userModel'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  session = require('express-session');
  
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb');

//global variables to mock the session
customSession = {};

//session stuff
app.use(cookieParser())
app.use(session({
	secret: 'mySecret', 
	saveUninitialized: false, 
	resave: false,
	cookie: { secure: false, originalMaxAge: 50000000 }
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));


// module.exports = app;

var routes = require('./api/routes/todoListRoutes');
routes(app);

app.listen(port);


console.log('todo list RESTful API server started on: ' + port);

// module.exports = app;