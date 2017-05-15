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
                "angularjs": req.body.postdetail.angularjs,
                "html5": req.body.postdetail.html5,
                "css": req.body.postdetail.css,
                "postId": post._id
            });

            postDetail.save(function (err) {
                if (err) {
                    return next(err);
                } else {
                    res.json({ errorCode: error.code_00000, errorDesc: error.desc_00000 });
                }
            });
        }
    });
};

exports.list = function (req, res, next) {
    var innerjoin = { path: 'postId', model: 'Post', populate: { path: 'author', model: 'User' } }
    var total = 0;
    PostDetail.find({}, function(err, postdetails) {
        if (err) {
            return next(err);
        } else {
            total = postdetails.length;
        }
    });
    PostDetail.find({},{},{ skip: (req.body.currentPage-1) * req.body.pageSize, limit: req.body.pageSize}).populate(innerjoin).exec(function (err, postdetails) {
        if (err) {
            return next(err);
        } else {
            var postdetail = {};
            var index = 0;
            postdetails.forEach(function (element) {
                postdetail[index] = {
                    "id": element.postId._id,
                    "header": element.postId.header,
                    "title": element.postId.title,
                    "content": element.content,
                    "sequence": element.sequence,
                    "username": element.postId.author.username,
                    "postDate": element.postId.postDate,
                    "angularjs": element.angularjs,
                    "html5": element.html5,
                    "css": element.css
                };
                index++;
            }, this);
            postdetail.length = total;
            res.json(postdetail);
        }
    });
};

exports.delete = function (req, res, next) {

    PostDetail.findOneAndRemove({ postId: req.params.id }, function (err) {
        if (err) {
            return next(err);
        } else {
            Post.findByIdAndRemove(req.params.id, function (err) {
                if (err) {
                    return next(err);
                } else {
                    res.json({ errorCode: error.code_00000, errorDesc: error.desc_00000 });
                }
            });
        }
    });

};

