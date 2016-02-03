var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  username: {type: String, required: true},
  postContent: {type: String, required: true},
  hashtags: {type: Array}
});
var Posts = mongoose.model('Posts', postSchema);

module.export = {
  Posts: Posts
};