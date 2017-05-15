var User = require('mongoose').model('User');

exports.create = function(req, res, next) {
    var user = new User(req.body);

    user.save(function(err) {
        if(err) {
            return next(err);
        } else {
            res.json(user);
        }
    });
};

exports.list = function(req, res, next) {
    User.find({}, function(err, users) {
        if (err) {
            return next(err);
        } else {
            res.json(users);
        }
    });
};

exports.read = function(req, res) {
    res.json(req.user);
};

exports.update = function(req, res, next) {
    User.findOneAndUpdate({username: req.user.username}, req.body, function(err, user) {
        if(err) {
            return next(err);
        } else {
            res.json(user);
        }
    });
};

exports.delete = function(req,res,next) {
    req.user.remove(function(err){
        if(err){
            return next(err);
        } else {
            res.json(req.user);
        }
    });
};

exports.userByUsername = function(req, res, next, username) {
    User.findOne({
        username: username
    }, function(err, user) {
        if(err) {
            return next(err);
        } else {
            req.user = user;
            next();
        }
    });
};

exports.login = function(req, res) {
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.sanitizeBody('email').normalizeEmail();
    var errors = req.validationErrors();
    if(errors) {
        res.render('index', {
            title: 'There have been validation error: ' + JSON.stringify(errors),
            isLoggedIn: false
        });
        return;
    }

    if(req.body.remember === 'remember') {
        req.session.remember = true;
        req.session.email = req.body.email;
        req.session.cookie.maxAge = 60000;
    }
    res.render('index', {
        title: 'Logged in as ' + req.body.email,
        isLoggedIn: true
    });
}; 

exports.logout = function(req, res) {
    req.session = null;
    res.render('index', {
        title: 'See you again later',
        isLoggedIn: false
    });
};