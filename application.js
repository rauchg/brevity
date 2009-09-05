(function($){
$.fn.application = function(application) {
    return this.each(function(){
        var iframe = $(this);

        var zIndex = $('iframe').length;

        iframe
            .addClass('application')
            .css('zIndex', zIndex)
            .css('left', (48 * zIndex) + 256)
            .css('top', (48 * zIndex) + 128)
            .attr('src', application.url)
            .appendTo('body');

        var overlay = $(document.createElement('div')).overlay(iframe);

        iframe.data('overlay', overlay);

        iframe.trigger('appcreated');

        // Overlay triggers 'click' when clicked and drag is not registered.

        iframe.click(function(){
            iframe.trigger('fullscreen');
        });

        // Hide iframes and overlays, including overlay for the active iframe
        // to make it possible to interact with it.

        iframe.bind('fullscreen', function(){
            $('.application:not(.active)').hide();
            iframe
                .addClass('fullscreen')
                .rectangle('screen');
        });

        iframe.bind('wall', function(){
            $('.application').show();
            iframe
                .removeClass('fullscreen')
                .rectangle(overlay.rectangle())
        });

        iframe.bind('togglefullscreen', function(){
            if (iframe.hasClass('fullscreen') === false)
                iframe.trigger('fullscreen');
            else
                iframe.trigger('wall');
        });

        $(window).resize(function(){
            iframe
                .css('width', window.innerWidth / 2)
                .css('height', window.innerHeight / 2);

            overlay.rectangle(iframe.rectangle());
        });
    });
};
})(jQuery);
