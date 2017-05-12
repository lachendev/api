module.exports = function(app) {
    var post = require('../controllers/post.controller');
    app.route('/post')
        .post(post.create)
        .get(post.list);
};