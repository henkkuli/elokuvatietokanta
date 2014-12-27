"use strict";

module.exports = function (sequelize, DataTypes) {
    var Person = sequelize.define("Person", {
        firstname: DataTypes.STRING,
        surname: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
                Person.hasMany(models.Movie, { as: "ActedMovies", constraints: false, through: 'movie_actor' });
                Person.hasMany(models.Movie, { as: "DirectedMovies", constraints: false, through: 'movie_director' });
            }
        }
    });
    
    return Person;
};
