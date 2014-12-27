define(['jquery', 'jqueryui'], function ($) {
    $.widget("ui.combobox", {
        _create: function () {
            var self = this;
            var select = this.element.hide(),
                selected = select.children(":selected"),
                value = "";
            var input = $("<input />")
              .insertAfter(select)
              .val(value)
              .autocomplete({
                delay: 0,
                minLength: 0,
                source: function (request, response) {
                    var matchers = request.term.split(' ').map(function (word) { return new RegExp($.ui.autocomplete.escapeRegex(word), 'i'); });
                    
                    function match(text) {
                        return matchers.every(function (matcher) {
                            return matcher.test(text);
                        })
                    }
                    
                    response(select.children("option").map(function () {
                        var text = $(this).text();
                        if (this.value && (!request.term || match(text)))
                            return {
                                label: text,
                                value: text,
                                option: this
                            };
                    }));
                },
                select: function (event, ui) {
                    ui.item.option.selected = true;
                    self._trigger("selected", event, {
                        item: ui.item.option
                    });
                },
                change: function (event, ui) {
                    if (!ui.item) {
                        var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex($(this).val()) + "$", "i"),
                            valid = false;
                        select.children("option").each(function () {
                            if (this.value.match(matcher)) {
                                this.selected = valid = true;
                                return false;
                            }
                        });
                        if (!valid) {
                            // remove invalid value, as it didn't match anything
                            $(this).val("");
                            select.val("");
                            return false;
                        }
                    }
                }
            })
          .addClass("ui-widget ui-widget-content ui-corner-left");
        }
    });
    
    function personSearch(form) {
        var select = form.find('select[name=person_id]');
        select.combobox();
    }
    
    personSearch($('.addActor'));
    personSearch($('.addDirector'));
});