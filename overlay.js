(function($){

$.fn.overlay = function(application) {
    return this.each(function(){
        var overlay = $(this)
            .addClass('application')
            .hide();

        overlay.mouseover(function(event){
            // This check is a workaround for what seems to be two bugs in
            // WebKit.
            //
            // 1. mouseover is triggered on divs with lower z-indexes than
            //    active during drag.
            //
            // 2. mouseover is sometimes triggered more than once on the
            //    active div during drag.

            if ($('div.application.drag').length === 0)
                $(document).trigger('activateapplication', application);
        });

        overlay.mousedown(function(event){
            overlay.addClass('drag');

            var original = overlay.offset(),
            clickX = event.clientX,
            clickY = event.clientY;

            var document = $(document);

            document.bind('mousemove.drag', function(event){
                var moveX = event.clientX - clickX,
                moveY = event.clientY - clickY,
                left = original.left + moveX,
                top = original.top + moveY;

                application.move(left, top);
                overlay
                    .css('left', left)
                    .css('top', top);
            });

            document.bind('mouseup.drag', function(event){
                overlay.removeClass('drag');
                document.unbind('.drag');

                if ($.isClick(clickX, clickY, event.clientX, event.clientY, 3)
                    === true)
                   document.trigger('fullscreen'); 
            });
        });
    });
};
})(jQuery);
