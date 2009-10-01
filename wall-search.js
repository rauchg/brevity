(function($){

$.fn.wallSearch = function(brevity) {
    return this.each(function(){
        var wallSearch = $(this);
        var input = wallSearch.find('input');
        var body = $('body');

        $(document).bind('keydown', function(e){
            if (body.hasClass('fullscreen') === true)
                return;

            if (e.keyCode === 27 || e.keyCode === 13)
                wallSearch.fadeOut();

            if (e.keyCode === 13) {
                var applicationDefinition = {
                    name: 'Web',
                    url: 'http://www.google.com/search?sourceid=brevity&ie=UTF-8&q=' + input.attr('value')
                };
                var application = brevity.createApplication(applicationDefinition);
                brevity.createDocument(application);
                brevity.activateApplication(application);
                brevity.wall();
            }
        });

        $(document).bind('keypress', function(e){
            if (body.hasClass('fullscreen') === true)
                return;

            if (wallSearch.css('display') !== 'none')
                return;
            wallSearch.show();
            input
                .attr('value', '')
                .focus();
        });

    });
};

})(jQuery);
