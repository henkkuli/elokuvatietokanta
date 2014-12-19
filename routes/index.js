var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/movies');
});

router.use('/movies', require('./movies'));
router.use('/people', require('./people'));

module.exports = router;
