var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  morgan = require('morgan'),
  mongoose = require('mongoose'),
  Message = require('./api/models/messageModel'),
  User = require('./api/models/userModel'),
  bodyParser = require('body-parser'),
  session = require('express-session');
  
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/Tododb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.set('view engine', 'ejs')


var routes = require('./api/routes/todoListRoutes');
routes(app);


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);

//global variables to mock the session
customSession = {};
exports.session = customSession;