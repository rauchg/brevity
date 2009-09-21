(function($){
$.fn.bar = function(orientation) {
    return this.each(function(){
        var bar = $(this).addClass('bar');

        this.toggleBar = function(topVisible, topHidden) {
            bar.stop({ clearQueue: true });
            if (bar.hasClass('hidden') === false)
                bar.animate({ top: topHidden }, 250);
            else
                bar.animate({ top: topVisible }, 250);
            bar.toggleClass('hidden');
        }

        bar.bind('toggle', function(){
            if (orientation === 'top')
                this.toggleBar(0, -22);
            else if (orientation === 'bottom')
                this.toggleBar(window.innerHeight - 22, window.innerHeight);
        });

        $(window).resize(function(){
            bar
                .css('left', 0)
                .css('width', window.innerWidth)
                .css('height', 22);
            if (orientation === 'top')
                bar.css('top', 0);
            else if (orientation === 'bottom')
                bar.css('top', window.innerHeight - 22);
        });
    });
};
})(jQuery);
