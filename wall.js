(function($){
$.fn.wall = function() {
    return this.each(function(){
        var wall = $(this);

        wall.bind('appactivate', function(e, iframe){
            iframe = $(iframe);
            var overlay = iframe.data('overlay');

            wall.find('iframe.active').removeClass('active');
            iframe.addClass('active');

            var iframes = $('iframe:not(.active)');

            iframes.sort(function(a, b) {
                return $(a).css('zIndex') - $(b).css('zIndex');
            });

            var zIndex = 0;

            for (var i = 0; i < iframes.length; i++)
            {
                var deactivate = $(iframes[i]);

                deactivate
                    .fadeExpo(0.5, 1000)
                    .css('zIndex', zIndex++)
                    .data('a')
                        .opacity(0.5)

                deactivate
                    .data('overlay')
                        .css('zIndex', zIndex + 1000);
            }

            iframe
                .opacity(1)
                .css('zIndex', zIndex)
                .data('a')
                    .opacity(1);

            overlay.css('zIndex', zIndex + 1000);

            wall.trigger('appactivated', iframe);
        });
    });
};
})(jQuery);
