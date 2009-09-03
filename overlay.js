(function($){
$.fn.overlay = function(iframe, z) {
    return this.each(function(){
        var overlay = $(this);

        overlay
            .addClass('application')
            .css('zIndex', z + 1000)
            .rectangle(iframe.rectangle())
            .appendTo('body');

        function isClick(x1, y1, x2, y2, limit) {
            if ((Math.abs(x2 - x1) <= limit) &&
                (Math.abs(y2 - y1) <= limit))
                return true;
            else
                return false;
        }

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
                iframe.trigger('activate');
        });

        overlay.mousedown(function(event){
            overlay.addClass('drag');

            var original = overlay.offset();
            var clickX = event.clientX;
            var clickY = event.clientY;

            var document = $(document);

            document.bind('mousemove.drag', function(event){
                var moveX = event.clientX - clickX;
                var moveY = event.clientY - clickY;
                var left = original.left + moveX;
                var top = original.top + moveY;

                iframe
                    .css('left', left)
                    .css('top', top);
                overlay
                    .css('left', left)
                    .css('top', top);
            });

            document.bind('mouseup.drag', function(event){
                overlay.removeClass('drag');
                document.unbind('.drag');

                if (isClick( clickX, clickY, event.clientX, event.clientY,
                    3) === true)
                    iframe.trigger('click');
            });
        });
    });
};
})(jQuery);
