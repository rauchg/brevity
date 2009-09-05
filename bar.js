(function($){
$.fn.bar = function(orientation) {
    return this.each(function(){
        var bar = $(this);

        this.slideBar = function(topVisible, topHidden) {
            if (bar.hasClass('hidden') === false) {
                bar
                    .addClass('hidden')
                    .stop({ clearQueue: true })
                    .animate({ top: topHidden }, 500);
            }
            else {
                bar
                    .removeClass('hidden')
                    .stop({ clearQueue: true })
                    .animate({ top: topVisible }, 500);
            }
        }

        bar.bind('togglevisibility', function(){
            if (orientation === 'top')
                this.slideBar(0, -24);
            else if (orientation === 'bottom')
                this.slideBar(window.innerHeight - 24, window.innerHeight);
        });

        $(window).resize(function(){
            bar
                .addClass('bar')
                .css('left', 0)
                .css('width', window.innerWidth)
                .css('height', 24);

            if (orientation === 'top')
                bar.css('top', 0);
            else if (orientation === 'bottom')
                bar.css('top', window.innerHeight - 24);
        });
    });
};
})(jQuery);
