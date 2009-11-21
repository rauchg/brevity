(function($){

// The overlay is a div-element placed on top of the active document-iframe to
// make it draggable. It's also used to remember the size of the iframe when the
// iframe is in fullscreen.

$.fn.applicationOverlay = function(brevity, application) {
    return this.each(function(){
        var overlay = $(this)
            .addClass('applicationOverlay')
            .mouseover(function(e){

                // This check is a workaround for what seems to be two bugs in
                // WebKit.
                //
                // 1. mouseover is triggered on divs with lower z-indexes than
                //    active during drag.
                //
                // 2. mouseover is sometimes triggered more than once on the
                //    active div during drag.

                if ($('div.applicationOverlay.drag').length === 0) {
                    $('iframe').removeClass('preview');

                    if (application.isActive() === false)
                        application.addClass('preview');
                }
            })
            .mouseleave(function(e){
                application.removeClass('preview');
            })
            .mousedown(function(e){
                brevity.activateApplication(application);
                overlay.addClass('drag');

                var overlayPosition = overlay.positionScaled(0.5);
                var mouseDownLeft = e.clientX;
                var mouseDownTop = e.clientY;

                // document in this context is the screen area. Mouse events are
                // bound to the entire screen for drag and drop.

                var document = $(document)
                    .bind('mousemove.drag', function(e){
                        var left = overlayPosition.left +
                            (e.clientX - mouseDownLeft);
                        var top = overlayPosition.top +
                            (e.clientY - mouseDownTop);

                        overlay.positionScaled(0.5, left, top);
                        application.positionScaled(0.5, left, top);
                    })
                    .bind('mouseup.drag', function(e){
                        overlay.removeClass('drag');
                        document.unbind('.drag');

                        if ($.isClick(mouseDownLeft, mouseDownTop,
                            e.clientX, e.clientY, 3) === true)
                            brevity.fullscreen();
                    });
            });
    });
};

})(jQuery);

