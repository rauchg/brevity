(function($){
$.fn.rectangle = function(rect) {
    if (rect === undefined) {
        return {
            left: this.css('left'),
            top: this.css('top'),
            width: this.css('width'),
            height: this.css('height')
        }
    }

    return this.each(function(){
        if (rect === 'screen') {
            $(this)
                .css('left', 0)
                .css('top', 0)
                .css('width', window.innerWidth)
                .css('height', window.innerHeight);
        }
        else if (rect === 'wall') {
            $(this)
                .css('left', 0)
                .css('top', 24)
                .css('width', window.innerWidth)
                .css('height', window.innerHeight - 48);
        }
        else {
            $(this)
                .css('left', rect.left)
                .css('top', rect.top)
                .css('width', rect.width)
                .css('height', rect.height);
        }
    });
};

$.fn.fadeExpo = function(opacity, duration) {
    return this.each(function(){
        $(this)
            .stop({ clearQueue: true })
            .animate({ opacity: opacity }, duration, 'easeOutExpo');
    });
}

$.fn.opacity = function(opacity) {
    return this.each(function(){
        $(this)
            .stop({ clearQueue: true })
            .css('opacity', opacity);
    });
}

$.isClick = function(x1, y1, x2, y2, limit) {
    return ((Math.abs(x2 - x1) <= limit) &&
        (Math.abs(y2 - y1) <= limit));
}
})(jQuery);
