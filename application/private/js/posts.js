var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  username: {type: String, required: true},
  postContent: {type: String, required: true},
  hashtags: {type: Array},
  dateCreated: {type: Date}
});
var posts = mongoose.model('posts', postSchema);

module.exports = posts;