var config = require('./config');
var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var sass = require('node-sass-middleware');
var validator = require('express-validator');
var session = require('express-session');
var passport = require('passport');
var cors = require('cors');

module.exports = function () {
    var app = express();
    const corsPolicy = {
        origin: '*',
        methods: 'GET,PUT,POST,DELETE,OPTIONS',
        allowedHeaders: 'Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, X-Language, X-Session, x-userTokenId, x-accessId, Pragma, Cache-Control, If-Modified-Since'
    }
    app.use(cors(corsPolicy));

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else {
        app.use(compression);
    }

    app.use(session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());
    app.use(validator());

    app.set('views', './app/views');
    app.set('view engine', 'jade');

    require('../app/routes/index.routes')(app);
    require('../app/routes/user.routes')(app);
    require('../app/routes/post.routes')(app);

    app.use(sass({
        src: './sass',
        dest: './public/css',
        outputStyle: 'compressed',
        prefix: '/css',
        debug: true
    }));

    app.use(express.static('./public'));

    return app;
}