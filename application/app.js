var express = require('express');
var app = express();
var port = process.env.PORT || 1337;
var mongoose = require('mongoose');
var passport = require('passport');
////var flash = require('connect-flash');
////var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

mongoose.connect('mongodb://localhost/monolog', function(err) {
  if (err) throw err;
  console.log('connected!');
});

require('./public/js/passport.js')(passport);

/////app.use(cookieParser());
app.use(bodyParser());

app.use(session({ secret: 'icecreamhasnobones', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
////app.use(flash());

require('./public/js/routes.js')(app,passport);

////app.use(flash());


//----------------------------------------


//mongoose.model('User',userSchema);
//var User = mongoose.model('User');

/*TEST USER----------------------------------------
////REMOVE THIS BLOCK ONCE THE ABILITY TO CREATE USERS IS COMPLETE
User.remove({}, function(err) { //Clear all existing docs
  if (err) throw err;
});
var johnny = new User({ //create doc
  email: 'john@gmail.com',
  username: 'john',
  password: 'secret'
})
johnny.save(function(err) { //save doc
  if (err) throw err;
  console.log('Johnny Saved');
});
END BLOCK TO REMOVE----------------------------------------*/




app.listen(port, function() {
  console.log('App is running!');
});