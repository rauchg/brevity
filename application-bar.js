(function($){

$.fn.applicationBar = function(brevity) {
    return this.each(function(){
        var applicationBar = $(this).bar('bottom');

        applicationBar.find('div#clock').clock();

        applicationBar.find('nav#applicationList')
            .live('mouseover', function(e){
                brevity.activateApplication($(e.target).data('application'));
            })
            .live('mousedown', function(e){
                var a = $(e.target);

                switch (e.button) {
                    case 0:
                        brevity.toggleFullscreen();
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
    });
};

})(jQuery);
