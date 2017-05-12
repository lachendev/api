var User = require('mongoose').model('User');
var Post = require('mongoose').model('Post');
var PostDetail = require('mongoose').model('PostDetail');
const error = require('../../config/error');

exports.create = function (req, res, next) {
    var post = new Post(req.body.post);

    post.save(function (err) {
        if (err) {
            return next(err);
        } else {
            var postDetail = new PostDetail({
                "sequence": req.body.postdetail.sequence,
                "content": req.body.postdetail.content,
                "tag": req.body.postdetail.tag,
                "postId": post._id
            });

            postDetail.save(function (err) {
                if (err) {
                    return next(err);
                } else {
                    res.json({errorCode: error.code_00000, errorDesc: error.desc_00000});
                }
            });
        }
    });
};

exports.list = function (req, res, next) {
    var innerjoin = {path:'postId', model: 'Post', populate: {path: 'author', model: 'User'}}
    PostDetail.find({}).populate(innerjoin).exec(function(err, postdetails){
        if(err) {
            return next(err);
        } else {
            var postdetail = {};
            var index = 0;
            postdetails.forEach(function(element) {
                postdetail[index] = {"title": element.postId.title, "content": element.content, "sequence": element.sequence, "username": element.postId.author.username, "postDate": element.postId.postDate};
                index++;
            }, this);
            res.json(postdetail);
        }
    });
};