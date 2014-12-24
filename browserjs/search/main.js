define(['require', 'jquery', 'jqueryui', './box'], function(require) {
  var $ = require('jquery');
  var searchBox = require('./box');

  var movieList = $('.movie_list')
  var box = new searchBox(movieList);
});
