var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

module.exports = function(app, passport) {
  app.use(bodyParser());
  app.use(express.static('application/public'));

  var urlParser = bodyParser.urlencoded({ extended: false });

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../html/index.html'));
  });

  app.post('/newuser', passport.authenticate('local-signup', {
    successRedirect: '/home',
    failureRedirect: '/joinpage'
    ////, failureFlash: true
  }));

  app.post('/login', urlParser, passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/failure'
  }));

  app.get('/failure', function(req, res){
    console.log('login failed');
    res.sendFile(path.join(__dirname + '/public/html/index.html'));
  });

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
    res.sendFile(path.join(__dirname + '/public/html/home.html'));
  });

};