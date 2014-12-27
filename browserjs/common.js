requirejs.config({
  baseUrl: window.location.protocol + "//" + window.location.host,
  paths: {
    jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min',
    jqueryui: '//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min'
  }
});

require(['jquery', 'jqueryui']);
