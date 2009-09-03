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
        $(this)
            .css('left', rect.left)
            .css('top', rect.top)
            .css('width', rect.width)
            .css('height', rect.height);
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
})(jQuery);
