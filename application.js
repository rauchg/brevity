(function($){
$.fn.application = function(application) {
    return this.each(function(){
        var z = $('iframe.application').length;

        var iframe = $(this);

        iframe
            .addClass('application')
            .css('zIndex', z)
            .css('left', (48 * z) + 256)
            .css('top', (48 * z) + 128)
            .css('width', window.innerWidth / 2)
            .css('height', window.innerHeight / 2)
            .attr('src', application.url)
            .appendTo('body');

        var overlay = $(document.createElement('div')).overlay(iframe, z);

        iframe.data('overlay', overlay);

        iframe.bind('activate', function(){
            $('.application.active').removeClass('active');
            iframe.addClass('active');
            var iframes = $('iframe.application:not(.active)');

            iframes.sort(function(a, b) {
                return $(a).css('zIndex') - $(b).css('zIndex');
            });

            var z = 0;

            iframes.each(function(){
                $(this)
                    .fadeExpo(0.75, 1000)
                    .css('zIndex', z)
                    .data('overlay')
                        .css('zIndex', z + 1000);

                z++;
            });

            iframe
                .opacity(1)
                .css('zIndex', z)
                .data('overlay')
                    .css('zIndex', z + 1000);
        });

        iframe.click(function(){
            iframe.trigger('fullscreen');
        });

        iframe.bind('fullscreen', function(){
            $('.application:not(.active)').hide();
            iframe
                .addClass('fullscreen')
                .css('left', 0)
                .css('top', 0)
                .css('width', window.innerWidth)
                .css('height', window.innerHeight)
        });

        iframe.bind('wall', function(){
            $('.application').show();
            iframe
                .removeClass('fullscreen')
                .rectangle(overlay.rectangle())
        });
    });
};
})(jQuery);
