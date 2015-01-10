"use strict";

module.exports = function (sequelize, DataTypes) {
    var Movie = sequelize.define("Movie", {
        name: DataTypes.STRING,
        origname: DataTypes.STRING,
        year: DataTypes.INTEGER,
        format: DataTypes.ENUM('bluray', 'bluray3d', 'dvd'),
        genre: DataTypes.ENUM('horror', 'thriller', 'action', 'adventure', 'comedy', 'crime', 'fantasy', 'documentary', 'romance', 'scifi', 'animation', 'drama', 'history', 'music', 'mystery', 'sport', 'war', 'western'),
        notice: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
                Movie.hasMany(models.Person, { as: 'Directors', through: 'movie_director' });
                Movie.hasMany(models.Person, { as: 'Actors', constrains: false, through: 'movie_actor' });
            }
        }
    });
    
    return Movie;
};
