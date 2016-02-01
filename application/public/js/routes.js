var express = require('express');
var path = require('path');

module.exports = function(app, passport) {
  app.use(express.static('application/public'));

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../html/index.html'));
  });

  app.post('/newuser', passport.authenticate('local-signup', {
    successRedirect: '/success',
    failureRedirect: '/#/joinpage',
    failureFlash: true
  }));

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/success',
    failureRedirect: '/#/loginpage',
    failureFlash: true
  }));

  app.use('/success', function(req, res, next){
    if (req.user) {
      next();
    }
    else {
      res.redirect('/');
    }
  });

  app.get('/success', function(req, res){
    console.log('login successful');
    console.log(req.user);
    res.sendFile(path.join(__dirname + '/../html/home.html'));
  });

};