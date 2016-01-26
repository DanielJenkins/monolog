var express = require('express');
var path = require('path');
var app = express();


app.use(express.static('application/public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/public/html/index.html'));
});

app.listen(1337, function() {
  console.log('App is running!');
});