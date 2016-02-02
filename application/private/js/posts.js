var mongoose = require('mongoose');

module.exports = function() {
  var postSchema = mongoose.Schema({
    username: {type: String, required: true},
    postContent: {type: String, required: true},
    hashtags: {type: Array}
  });

  var Post = mongoose.model('Post', postSchema);

  //test only---------------------------------------
  Post.remove({}, function(err) { //Clear all existing docs
    if (err) throw err;
  });
  var myPost = new Post();
  myPost.username = 'Bill';
  myPost.postContent = 'This is a post';
  myPost.hashtags = ['fish'];
  myPost.save(function(err) { //save doc
    if (err) throw err;
    console.log('Bill Saved');
  });
  //---------------------------------------

};
