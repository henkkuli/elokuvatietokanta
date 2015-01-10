"use strict";

module.exports = {
    up: function (migration, DataTypes, done) {
        // add altering commands here, calling 'done' when finished
        migration.addColumn('Movies', 'year', DataTypes.INTEGER).done(function (err) {
            if (err)
                return done(err);
            migration.addColumn('Movies', 'format', DataTypes.ENUM('bluray', 'bluray3d', 'dvd')).done(function (err) {
                if (err)
                    return done(err);
                migration.addColumn('Movies', 'genre', DataTypes.ENUM('horror', 'thriller', 'action', 'adventure', 'comedy', 'crime', 'fantasy', 'documentary', 'romance', 'scifi', 'animation', 'drama', 'history', 'music', 'mystery', 'sport', 'war', 'western')).done(function (err) {
                    if (err)
                        return done(err);
                    migration.addColumn('Movies', 'notice', DataTypes.STRING).done(done);
                });
            });
        });
    },
    
    down: function (migration, DataTypes, done) {
        // add reverting commands here, calling 'done' when finished
        migration.removeColumn('Movies', 'year').done(function (err) {
            if (err)
                return done(err);
            migration.removeColumn('Movies', 'format').done(function (err) {
                if (err)
                    return done(err);
                migration.removeColumn('Movies', 'genre').done(function (err) {
                    if (err)
                        return done(err);
                    migration.removeColumn('Movies', 'notice').done(done);
                });
            });
        });
    }
};
