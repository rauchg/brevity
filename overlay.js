(function($){

$.fn.overlay = function(iframe) {
    return this.each(function(){
        var div = $(this);

        div
            .addClass('application')
            .appendTo('body');

        div.mouseover(function(event){
            // This check is a workaround for what seems to be two bugs in
            // WebKit.
            //
            // 1. mouseover is triggered on divs with lower z-indexes than
            //    active during drag.
            //
            // 2. mouseover is sometimes triggered more than once on the
            //    active div during drag.

            if ($('div.application.drag').length === 0)
                $('body').trigger('appactivate', iframe);
        });

        div.bind('activate', function(e, data) {
            div.css('zIndex', data + 1000);
        });

        div.bind('deactivate', function(e, data) {
            div.css('zIndex', data + 1000);
        });

        div.mousedown(function(event){
            div.addClass('drag');

            var original = div.offset();
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
                div
                    .css('left', left)
                    .css('top', top);
            });

            document.bind('mouseup.drag', function(event){
                div.removeClass('drag');
                document.unbind('.drag');

                if ($.isClick(clickX, clickY, event.clientX, event.clientY, 3)
                    === true)
                    iframe.trigger('click');
            });
        });
    });
};
})(jQuery);
