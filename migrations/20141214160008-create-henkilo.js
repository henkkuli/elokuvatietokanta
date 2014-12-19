"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Henkilos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      etunimi: {
        type: DataTypes.STRING
      },
      sukunimi: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("Henkilos").done(done);
  }
};