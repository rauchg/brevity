(function($){
$.fn.application = function(instanceId, application, z) {
    return this.each(function(){
        var iframe = $(this);

        iframe
            .data('instanceId', instanceId)
            .addClass('application')
            .css('zIndex', z)
            .css('left', (48 * z) + 256)
            .css('top', (48 * z) + 128)
            .css('width', window.innerWidth / 2)
            .css('height', window.innerHeight / 2)
            .attr('src', application.url)
            .appendTo('body');

        iframe.bind('activate', function(){
            var active = $(this);

            // Select all iframes.

            var iframes = $('iframe');

            // Sort by z-index.

            iframes.sort(function(a, b) {
                return $(a).css('zIndex') > $(b).css('zIndex');
            });

            var z = 0;

            // Set z-indexes starting from 0.

            iframes.each(function(){
                var iframe = $(this);

                if (iframe.data('instanceId') !==
                    active.data('instanceId')) {

                    iframe
                        .fadeExpo(0.75, 1000)
                        .css('zIndex', z)
                        .data('overlay')
                            .css('zIndex', z + 1000);

                    z++;
                }
            });

            // Active gets highest z-index.

            active
                .opacity(1)
                .css('zIndex', z)
                .data('overlay')
                    .css('zIndex', z + 1000);
        });

        iframe.bind('click', function(){
            console.log('click');
        });
    });
};
})(jQuery);
