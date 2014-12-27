var express = require('express');
var router = express.Router();

router.get('/login', function (req, res) {
    res.render('users/login');
});

router.post('/login', function (req, res) {
    var username = req.param('username');
    var password = req.param('password');
    req.login(username, password, function (user) {
        res.redirect('/');
    });
});

router.get('/register', function (req, res) {
    res.render('users/register');
});

router.post('/register', function (req, res) {
    var username = req.param('username');
    var password = req.param('password');
    req.register(username, password, function (user) {
        res.redirect('/');
    });
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
