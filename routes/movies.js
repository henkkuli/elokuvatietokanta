var models = require('../models');
var express = require('express');
var router = express.Router();

// List movies
router.get('/', function(req, res) {
  models.Movie.findAll({
    order: [['name', 'ASC']]
  }).then(function(movies) {
    res.render('movies/index', {
      movies: movies
    });
  });
});

// Create a movie
router.post('/create', function(req, res) {
  models.Movie.create({
    name: req.param('name')
  }).then(function(user) {
    res.redirect('/movies/' + user.id + '/view');
  });
});

// View a movie
router.get('/:id/view', function(req, res) {
  models.Movie.find({
    where: {id: req.param('id')},
    include: [
      {model: models.Person, as: 'Actors'},
      {model: models.Person, as: 'Directors'}
    ]
  }).then(function(movie) {
    models.Person.findAll({
      order: [['surname', 'ASC'], ['firstname', 'ASC']]
    }).then(function(people) {
      res.render('movies/view', {
        movie: movie,
        people: people
      });
    });
  });
});

// Add an actor for a movie
router.post('/:id/add_actor', function(req, res) {
  models.Movie.find({
    where: {id: req.param('id')},
  }).then(function(movie) {
    movie.addActor(parseInt(req.param('person_id')));
    res.redirect('/movies/' + req.param('id') + '/view/');
  });
});

// Add a director for a movie
router.post('/:id/add_director', function(req, res) {
  models.Movie.find({
    where: {id: req.param('id')},
  }).then(function(movie) {
    movie.addDirector(parseInt(req.param('person_id')));
    res.redirect('/movies/' + req.param('id') + '/view/');
  });
});

module.exports = router;
