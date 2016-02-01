var LocalStrategy   = require('passport-local').Strategy;
var User = require('./user.js');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    console.log(user);
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      console.log(user);
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
  },
    function(req, email, password, done) {
      process.nextTick(function() {
        User.findOne({ 'local.email' :  email }, function(err, user) {
          if (err) {
            return done(err);
          }
          if (user) {
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
          }
          else {
            var newUser = new User();
            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password);
            newUser.save(function(err) {
              if (err) {
                throw err;
              }
              return done(null, newUser);
            });
          }
        });
      });
    }));
};





/*
function(req, email, password, done) {
  User.findOne({ 'local.email' :  email }, function(err, user) {
    if (err)
            return done(err);
        if (!user)
            return done(null, false, req.flash('loginMessage', 'No user found.'));
        if (!user.validPassword(password))
            return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
        return done(null, user);
        */

/*
var strategy = new LocalStrategy(function(email, password, done) {
    User.findOne({ email: email }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        if (user.password != password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
  });
  passport.use('local-signup', strategy);
  */