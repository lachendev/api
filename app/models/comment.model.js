var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var User = mongoose.model('User');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    deleted: {
        type: String,
        required: true
    },
    postId: {
        type: Schema.ObjectId,
        ref: 'Post'
    },
    commenterId: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});
var Comment = mongoose.model('Comment', CommentSchema);

var post = new Post();
post.save();

var user = new User();
user.save();

var comment = new Comment();
comment.postId = post;
comment.commenterId = user;
comment.save();