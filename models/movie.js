"use strict";

module.exports = function(sequelize, DataTypes) {
  var Movie = sequelize.define("Movie", {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Movie.hasMany(models.Person, {as: 'Directors', through: 'movie_director'});
        Movie.hasMany(models.Person, {as: 'Actors', constrains: false, through: 'movie_actor'});
      }
    }
  });

  return Movie;
};
