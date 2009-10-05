(function($){

$.fn.documentBar = function(brevity) {
    return this.each(function(){
        var documentBar = $(this).bar('top');

        documentBar.find('input#newDocument').live('mousedown', function(){
            if (brevity.getActiveApplication() !== null) {
                brevity.createDocument(brevity.getActiveApplication());
                brevity.getActiveApplication().resize();
            }
        });

        documentBar.find('canvas#toggleFullscreenCanvas').live('mousedown', function(){
            brevity.toggleFullscreen();
        });
    });
};

})(jQuery);
