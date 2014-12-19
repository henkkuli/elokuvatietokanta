var models = require('../models');
var express = require('express');
var router = express.Router();

// List movies
router.get('/', function(req, res) {
  models.Person.findAll({
    order: [['surname', 'ASC'], ['firstname', 'ASC']]
  }).then(function(people) {
    res.render('people/index', {
      people: people
    });
  });
});

// Create a person
router.post('/create', function(req, res) {
  models.Person.create({
    firstname: req.param('firstname'),
    surname: req.param('surname')
  }).then(function(person) {
    res.redirect('/people/' + person.id + '/view');
  });
});

// View a person
router.get('/:id/view', function(req, res) {
  models.Person.find({
    where: {id: req.param('id')},
    include: [
      {model: models.Movie, as: 'ActedMovies'},
      {model: models.Movie, as: 'DirectedMovies'}
    ]
  }).then(function(person) {
    res.render('people/view', {
      person: person
    });
  });
});

module.exports = router;
