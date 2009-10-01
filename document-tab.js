(function($){

$.fn.documentTab = function(url) {
    return this.each(function(){
        var documentTab = $(this);

        var span = $(document.createElement('span'))
            .text(url)
            .appendTo(documentTab);

        var input = $(document.createElement('input'))
            .hide()
            .addClass('text')
            .appendTo(documentTab);


    });
};

})(jQuery);
