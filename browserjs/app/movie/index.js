define(['jquery'], function ($) {
    var area = $('.searcharea');
    var movielist = $('.movielist');
    
    var box = $('.searcharea .q');
    
    // Hide submit box
    $('.searcharea .submit').hide();
    
    function searchAndShow() {
        $.getJSON('/movies/ajax/search', { q: box.val(), date: (new Date()).getTime() }, function (data) {
            movielist.empty();
            data.forEach(function (entry) {
                var li = $('<li/>').append($('<a/>').attr('href', '/movies/' + entry.id + '/view').text(entry.name));

                movielist.append(li);
            });
        });
    }
    
    box.change(searchAndShow);
    box.keyup(searchAndShow);
});