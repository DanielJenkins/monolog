var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {
  var postSchema = new Schema({
    username: {type: String, required: true},
    postContent: {type: String, required: true},
    hashtags: {type: Array}
  });
  mongoose.model('posts', postSchema);
};
