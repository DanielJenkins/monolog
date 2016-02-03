var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var Post = require('./posts.js');

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
    if(user)
      res.send(user);
  });

  app.post('/newPost', function(req, res) {
    var userdata = req.user.local.email;
    console.log('USER: ' + userdata);
    var hashtags = [];
    var postContent = req.body.postContent;
    var postContentArray = postContent.split(' ');
    for (var i = 0; i < postContentArray.length; i++) {
      if (postContentArray[i].indexOf('#') >= 0) {
        hashtags.push(postContentArray[i]);
      };
    };
    var today = new Date();
    new Post({
      username: userdata,
      postContent: postContent,
      hashtags: hashtags,
      dateCreated: today
    }).save(function(err,doc) {
      if(err) {
        res.json(err);
      }
      else {
        console.log('New Post Generated');
        res.sendFile(path.join(__dirname + '/../../public/html/home.html'));
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
    });
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};