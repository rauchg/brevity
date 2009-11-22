// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

(function($) {

// Remove 'px' from CSS-value and convert to int.

$.removePx = function(str) {
    return parseInt(str.substr(0, str.length - 2), 10);
}

// The four functions below works when position is absolute. offset() returns
// strage results in WebKit when the element is transformed.
//
// width() and height() are defined by jQuery, but they don't work that well on
// hidden elements.

$.fn.left = function() {
    return $.removePx($(this).css('left'));
}

$.fn.top = function() {
    return $.removePx($(this).css('top'));
}

$.fn.width_ = function() {
    return $.removePx($(this).css('width'));
}

$.fn.height_ = function() {
    return $.removePx($(this).css('height'));
}

// Gets or sets the position of a scale-transformed element with
// transformation-origin set to center. Accepts or returns a non-transformed
// position.
//
// Position element at 10, 10:
//
// element.positionScaled(0.5, 10, 10);
//
// Get the position of the element:
//
// element.positionScaled(0.5); // Returns {left:10,top:10}:  

$.fn.positionScaled = function(scale, left, top) {
    var element = $(this);

    var scaledWidth = element.width_() * scale;
    var scaledHeight = element.height_() * scale;

    var offsetLeft = (element.width_() / 2) - (scaledWidth / 2);
    var offsetTop = (element.height_() / 2) - (scaledHeight / 2);

    if (left === undefined)
        return {
            left: element.left() + offsetLeft, 
            top: element.top() + offsetTop
        };
    else
        element
            .css('left', left - offsetLeft)
            .css('top', top - offsetTop);
}

// Positions an element with x, y as center point.

$.fn.positionAround = function(x, y) {
    var element = $(this);

    var left = x - (element.width() / 2);
    var top = y - (element.height() / 2);

    element
        .css('left', $.range(left, left + element.width(), 0, window.innerWidth))
        .css('top', $.range(top, top + element.height(), 0, window.innerHeight));
}

$.fn.rectangle = function(rect) {
    if (rect === undefined) {
        return {
            left: this.css('left'),
            top: this.css('top'),
            width: this.css('width'),
            height: this.css('height')
        }
    }

    return this.each(function() {
        $(this)
            .css('left', rect.left)
            .css('top', rect.top)
            .css('width', rect.width)
            .css('height', rect.height);
    });
};

$.fn.button = function(title) {
    return $(this)
        .addClass('button')
        .attr('type', 'button')
        .attr('value', title);
}

// Used to distinguish a click from a drag. x1, y1 is mousedown and x2, y2 is
// mouseup.

$.isClick = function(x1, y1, x2, y2, limit) {
    return ((Math.abs(x2 - x1) <= limit) &&
        (Math.abs(y2 - y1) <= limit));
}

// Makes sure that a line to be positioned within a longer line, isn't placed
// before or after the outer line. Returns the adjusted start position.
//
// Useful for keeping a rectangle within the screen area. Has to be called once
// for each of the axes.

$.range = function(from1, to1, from2, to2) {
    if (Math.max(from1, from2) === from2)
        return from2;
    else if (Math.min(to1, to2) === to2)
        return to2 - (to1 - from1);
    else
        return from1;
}

})(jQuery);

