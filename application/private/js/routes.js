var express = require('express');
var path = require('path');

module.exports = function(app, passport) {
  app.use(express.static('application/public'));

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../../public/html/index.html'));
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
    res.sendFile(path.join(__dirname + '/../../public/html/home.html'));
  });

  app.post('/user', function(req, res) {
    var user = req.user;
    console.log('/user sending ' + req.user);
    if(user)
      res.send(user);
  });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
};