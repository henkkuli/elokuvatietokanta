var models = require('../models');
var express = require('express');
var router = express.Router();

// List movies
router.get('/', function (req, res) {
    // Enforce authentication
    if (!req.session.userid)
        return res.redirect('/');

    models.Movie.findAll({
        order: [['name', 'ASC']]
    }).then(function (movies) {
        res.render('movies/index', {
            movies: movies
        });
    });
});

// Create a movie
router.post('/create', function (req, res) {
    // Enforce authentication
    if (!req.session.userid)
        return res.redirect('/');

    var name = req.param('name');
    var origname = req.param('origname');
    if (!name || !name.length) {
        res.redirect('/movies/');
        return;
    }
    if (!origname || !origname.length)
        origname = name;
    
    models.Movie.create({
        name: name,
        origname: origname
    }).then(function (user) {
        res.redirect('/movies/' + user.id + '/view');
    });
});

// View a movie
router.get('/:id/view', function (req, res) {
    // Enforce authentication
    if (!req.session.userid)
        return res.redirect('/');

    models.Movie.find({
        where: { id: req.param('id') },
        include: [
            { model: models.Person, as: 'Actors' },
            { model: models.Person, as: 'Directors' }
        ]
    }).then(function (movie) {
        models.Person.findAll({
            order: [['surname', 'ASC'], ['firstname', 'ASC']]
        }).then(function (people) {
            res.render('movies/view', {
                movie: movie,
                people: people
            });
        });
    });
});

// Edit the movie data
router.post('/:id/edit', function (req, res) {
    // Enforce authentication
    if (!req.session.userid)
        return res.redirect('/');

    var name = req.param('name');
    var origname = req.param('origname');
    if (!name || !name.length) {
        res.redirect('/movies/');
        return;
    }
    if (!origname || !origname.length)
        origname = name;
    
    models.Movie.find({
        where: { id: req.param('id') },
    }).then(function (movie) {
        movie.name = name;
        movie.origname = origname;
        movie.save().success(function () {
            res.redirect('/movies/' + req.param('id') + '/view/');
        });
    });
});

// Add an actor for a movie
router.post('/:id/add_actor', function (req, res) {
    // Enforce authentication
    if (!req.session.userid)
        return res.redirect('/');

    models.Movie.find({
        where: { id: req.param('id') },
    }).then(function (movie) {
        movie.addActor(parseInt(req.param('person_id')));
        res.redirect('/movies/' + req.param('id') + '/view/');
    });
});

// Remove an actor from the movie
router.post('/:id/remove_actor/:person_id', function (req, res) {
    // Enforce authentication
    if (!req.session.userid)
        return res.redirect('/');

    models.Movie.find({
        where: { id: req.param('id') },
    }).then(function (movie) {
        movie.removeActor(parseInt(req.param('person_id')));
        res.redirect('/movies/' + req.param('id') + '/view/');
    });
});

// Remove a director from the movie
router.post('/:id/remove_director/:person_id', function (req, res) {
    // Enforce authentication
    if (!req.session.userid)
        return res.redirect('/');

    models.Movie.find({
        where: { id: req.param('id') },
    }).then(function (movie) {
        movie.removeDirector(parseInt(req.param('person_id')));
        res.redirect('/movies/' + req.param('id') + '/view/');
    });
});

// Add a director for a movie
router.post('/:id/add_director', function (req, res) {
    // Enforce authentication
    if (!req.session.userid)
        return res.redirect('/');

    models.Movie.find({
        where: { id: req.param('id') },
    }).then(function (movie) {
        movie.addDirector(parseInt(req.param('person_id')));
        res.redirect('/movies/' + req.param('id') + '/view/');
    });
});

// Remove the movie
router.post('/:id/remove', function (req, res) {
    // Enforce authentication
    if (!req.session.userid)
        return res.redirect('/');

    models.Movie.find({
        where: { id: req.param('id') },
    }).then(function (movie) {
        movie.setActors([]);
        movie.setDirectors([]);
        movie.destroy().success(function () {
            res.redirect('/movies/');
        });
    });
});

// Search
function searchMovies(query, cb) {
    var words = query.split(' ');
    var likes = words.filter(function (word) {
        return word.length > 0;
    }).map(function (word) {
        return models.Sequelize.or(
            {
                name: {
                    like: '%' + word + '%'
                }
            },
            {
                origname: {
                    like: '%' + word + '%'
                }
            });
    });
    models.Movie.findAll({
        where: models.Sequelize.and.apply(models.Sequelize, likes),
        order: [['name', 'ASC']]
    }).then(function (movies) {
        cb(movies);
    });
}
router.get('/search', function (req, res) {
    // Enforce authentication
    if (!req.session.userid)
        return res.redirect('/');

    var q = req.param('q');
    searchMovies(q, function (movies) {
        res.render('movies/index', {
            movies: movies
        });
    });
});
router.get('/ajax/search', function (req, res) {
    // Enforce authentication
    if (!req.session.userid)
        return res.redirect('/');

    var q = req.param('q');
    searchMovies(q, function (movies) {
        res.json(movies);
    });
});

module.exports = router;
