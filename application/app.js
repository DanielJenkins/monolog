var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var db = require('./private/js/mongodb.js');

mongoose.connect(db.db, function(err) {
  if (err) throw err;
  console.log('connected!');
});

require('./private/js/passport.js')(passport);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({ secret: 'icecreamhasnobones', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./private/js/routes.js')(app,passport);

var port = process.env.PORT || 1337;
app.listen(port, function() {
  console.log('App is running!');
});