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

$.fn.fadeToExpo = function(duration, opacity) {
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

$.create = {};

$.create.nav = function() {
    return $(document.createElement('nav'));
}

$.create.div = function() {
    return $(document.createElement('div'));
}

$.create.iframe = function() {
    return $(document.createElement('iframe'));
}

$.create.a = function() {
    return $(document.createElement('a'));
}
})(jQuery);
