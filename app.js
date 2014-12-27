var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var bcrypt = require('bcrypt');
var i18n = require('i18next');
var requirejsMiddleware = require('requirejs-middleware');
var models = require('./models');

var routes = require('./routes/index');
var users = require('./routes/users');

i18n.init({
    saveMissing: true
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'jnasdnnio83rufn84uhj',
    saveUninitialized: true,
    resave: true
}));

// Login
app.use(function (req, res, next) {
    req.logup = function logup(username, password, cb) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        console.log('Hashed: ' + hash);
        
        /*models.User.find({
            where: {
                username: username,
                password: password
            }
        }).then(function (user) {
            if (user) {
                req.session.userid = user.id;
                cb(user);
            } else
                res.redirect('/');
        });*/
    };
    req.login = function login(username, password, cb) {
        models.User.find({
            where: {
                username: username
            }
        }).then(function (user) {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.userid = user.id;
                cb(user);
            } else
                res.redirect('/');
        });
    };
    req.getuser = function getuser(cb) {
        models.User.find(req.session.userid).then(function (user) {
            if (user)
                cb(user);
            else
                res.redirect('/');
        });
    };
    req.logout = function logout() {
        req.session.userid = undefined;
    }
    
    next();
});


//models.User.create({ username: 'admin', password: '$2a$10$aOzZLEsrDigJZD2RDE.NoOJgWDsdHOzpJLFFhMd9QIZXBFE65e2re' });
//app.use(requirejsMiddleware({
//  src: path.join(__dirname, 'browserjs'),
//  dest: path.join(__dirname, 'build'),
//  build: true,
//  debug: true,
//  defaults: {
//    baseUrl: path.join(__dirname, 'browserjs'),
//    paths: {
//      jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min',
//      jqueryui: '//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min'
//    }
//  },
//  modules: {
//    '/movie/index.js': {include: 'movie/index'}
//  }
//}));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'build')));

// Browser js
if (app.get('env') === 'development') {
    app.use(express.static(path.join(__dirname, 'browserjs')));
}

app.use(i18n.handle);
i18n.registerAppHelper(app);

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
