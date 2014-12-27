var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    if(req.session.userid)
        res.redirect('/movies');
    else
        res.redirect('/users/login');
});

router.use('/movies', require('./movies'));
router.use('/people', require('./people'));
router.use('/users', require('./users'));

module.exports = router;
