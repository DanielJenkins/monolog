var express = require('express');
var app = express();

app.use(express.static('server/public'));

app.listen(1337, function() {
  console.log('App is running!');
});