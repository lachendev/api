var config = require('./config');
var mongoose = require('mongoose');

module.exports = function() {
    mongoose.set('debug', config.debug);
    var db = mongoose.connect(config.mongoUri);

    require('../app/models/user.model');
    require('../app/models/post.model');
    require('../app/models/postdetail.model');
    require('../app/models/comment.model');
    
    return db;
};