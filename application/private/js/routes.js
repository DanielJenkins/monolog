var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var Post = require('./posts.js');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

module.exports = function(app, passport) {
  app.use(express.static('application/public'));

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../../public/html/index.html'));
  });

  app.post('/newuser', passport.authenticate('local-signup', {
    successRedirect: '/success',
    failureRedirect: '/#/joinErr',
    failureFlash: true
  }));

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/success',
    failureRedirect: '/#/loginErr',
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
    if(user)
      res.send(user);
  });

  app.post('/newPost', function(req, res) {
    var userdata = req.user.local.username;
    var hashtags = [];
    var usertags = [];
    usertags.push(userdata.toLowerCase());
    var postContent = req.body.postContent;
    var postContentArray = postContent.split(' ');
    for (var i = 0; i < postContentArray.length; i++) {
      switch (postContentArray[i].substring(0,1)) {
        case '#':
          hashtags.push(postContentArray[i].substring(1).toLowerCase());
          break; 
        case '@':
          usertags.push(postContentArray[i].substring(1).toLowerCase());
          break;
      };
    };
    var today = new Date();
    new Post({
      username: userdata,
      postContent: postContent,
      hashtags: hashtags,
      usertags: usertags,
      dateCreated: today
    }).save(function(err,doc) {
      if(err) {
        res.json(err);
      }
      else {
        console.log('marking');
        console.log(__dirname);
        console.log(path);
        res.redirect('/success');
      }
    });
  });

  app.get('/posts', function(req, res) {
    Post.find(function(err, posts) {
      if (err) {
        throw err;
      }
      else {
        res.send(posts);
      };
    }).sort({dateCreated: -1}).limit(30);
  });

  app.post('/search', jsonParser, function(req, res) {
    Post.find(req.body.searchObj, function(err, posts) {
      if (err) {
        throw err;
      }
      else {
        res.send(posts);
      };
    }).sort({dateCreated: -1}).limit(30);
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};