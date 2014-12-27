var models = require('../models');
var express = require('express');
var router = express.Router();

// List movies
router.get('/', function (req, res) {
    models.Person.findAll({
        order: [['surname', 'ASC'], ['firstname', 'ASC']]
    }).then(function (people) {
        res.render('people/index', {
            people: people
        });
    });
});

// Create a person
router.post('/create', function (req, res) {
    var firstname = req.param('firstname');
    var surname = req.param('surname');
    if (!firstname || !firstname.length || !surname || !surname.length) {
        res.redirect('/people/');
        return;
    }
    models.Person.create({
        firstname: firstname,
        surname: surname
    }).then(function (person) {
        res.redirect('/people/' + person.id + '/view');
    });
});

// View a person
router.get('/:id/view', function (req, res) {
    models.Person.find({
        where: { id: req.param('id') },
        include: [
            { model: models.Movie, as: 'ActedMovies' },
            { model: models.Movie, as: 'DirectedMovies' }
        ]
    }).then(function (person) {
        res.render('people/view', {
            person: person
        });
    });
});

// Edit the person
router.post('/:id/edit', function (req, res) {
    var firstname = req.param('firstname');
    var surname = req.param('surname');
    if (!firstname || !firstname.length || !surname || !surname.length) {
        res.redirect('/people/');
        return;
    }
    
    models.Person.find({
        where: { id: req.param('id') }
    }).then(function (person) {
        person.firstname = firstname;
        person.surname = surname;
        person.save().success(function () {
            res.redirect('/people/' + person.id + '/view');
        });
    });
});

module.exports = router;
