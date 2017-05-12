var mongoose = require('mongoose');
var User = mongoose.model('User');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    header: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    postDate: {
        type: Date,
        default: Date.now
    },
    deleted: {
        type: String,
        required: true
    },
    author: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});
var Post = mongoose.model('Post', PostSchema);

var user = new User();
user.save();

var post = new Post();
post.author = user;
post.save();