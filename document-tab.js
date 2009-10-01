(function($){

$.fn.documentTab = function() {
    return this.each(function(){
        var documentTab = $(this);

        var span = $(document.createElement('span')).text(this.url);

        var input = $(document.createElement('input'))
            .hide()
            .addClass('text');


    });
};

})(jQuery);
