"use strict";

module.exports = {
    up: function (migration, DataTypes, done) {
        // add altering commands here, calling 'done' when finished
        migration.addColumn('Movies', 'origname', DataTypes.STRING).done(done());
    },
    
    down: function (migration, DataTypes, done) {
        // add reverting commands here, calling 'done' when finished
        migration.removeColumn('Movies', 'origname').done(done());
    }
};
