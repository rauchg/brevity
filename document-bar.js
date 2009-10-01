(function($){

$.fn.documentBar = function(brevity) {
    return this.each(function(){
        var documentBar = $(this).bar('top');

        documentBar.find('input#newDocument').live('mousedown', function(){
            //if (activeApplication !== null) {
                brevity.createDocument(activeApplication);
                $(window).trigger('resize');
            //}
        });

        documentBar.find('canvas#toggleFullscreenCanvas').live('mousedown', function(){
            brevity.toggleFullscreen();
        });
    });
};

})(jQuery);
