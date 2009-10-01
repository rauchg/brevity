(function($){

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

                if ($('div.applicationOverlay.drag').length === 0)
                    brevity.activateApplication(application);
            })
            .mousedown(function(e){
                overlay.addClass('drag');

                var original = overlay.offset(),
                clickX = e.clientX,
                clickY = e.clientY;

                var document = $(document)
                    .bind('mousemove.drag', function(e){
                        var moveX = e.clientX - clickX,
                        moveY = e.clientY - clickY,
                        left = original.left + moveX,
                        top = original.top + moveY;

                        application.move(left, top);
                        overlay
                            .css('left', left)
                            .css('top', top);
                    })
                    .bind('mouseup.drag', function(e){
                        overlay.removeClass('drag');
                        document.unbind('.drag');

                        if ($.isClick(clickX, clickY, e.clientX, e.clientY, 3)
                            === true)
                            brevity.fullscreen();
                    });
            });
    });
};

})(jQuery);
