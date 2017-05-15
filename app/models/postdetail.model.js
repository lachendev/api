var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Schema = mongoose.Schema;

var PostDetailSchema = new Schema({
    sequence: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    angularjs: {
        type: Boolean,
        default: false
    },
    html5: {
        type: Boolean,
        default: false
    },
    css: {
        type: Boolean,
        default: false
    },
    postId: {
        type: Schema.ObjectId,
        ref: 'Post'
    }
});
var PostDetail = mongoose.model('PostDetail', PostDetailSchema);

var post = new Post();
post.save();

var postDetail = new PostDetail();
postDetail.postId = post;
postDetail.save();