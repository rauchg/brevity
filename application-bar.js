(function($){

$.fn.applicationBar = function(brevity) {
    return this.each(function(){
        var applicationBar = $(this).bar('bottom');

        applicationBar.find('nav#applicationList')
            .live('mousedown', function(e){
                var a = $(e.target);
                var application = $(e.target).data('application');

                switch (e.button) {
                    case 0:
                        if (brevity.getActiveApplication() === application)
                            brevity.toggleFullscreen();
                        else
                            brevity.activateApplication(application);
                        break;
                    case 2:
                        brevity.removeApplication(a.data('application'));
                        break;
                }
            });

        applicationBar.find('input#newApplication').live('mousedown', function(){
            var applicationGrid = $('#applicationGrid');

            if (applicationGrid.hasClass('active'))
                applicationGrid.removeClass('active');
            else
                applicationGrid
                    .css('left', 0)
                    .css('top', $(this).offset().top - applicationGrid.height())
                    .addClass('active');
        });

        applicationBar.find('div#clock').clock();
    });
};

})(jQuery);
