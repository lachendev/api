module.exports = function(app) {
    var post = require('../controllers/post.controller');
    app.route('/post')      
        .post(post.list);
    app.route('/createpost')
        .post(post.create);
    app.route('/post/:id')
    //     .get(post.read)
    //     .put(post.update)
        .delete(post.delete);
};