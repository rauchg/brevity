// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

(function($){

// Remove 'px' from css-value and convert to int.

$.removePx = function(str) {
    return parseInt(str.substr(0, str.length - 2), 10);
}

// Only works when position is set to absolute. offset() returns strage results
// in WebKit when the element is transformed.

$.fn.left = function() {
    return $.removePx($(this).css('left'));
}

$.fn.top = function() {
    return $.removePx($(this).css('top'));
}

// Gets or sets the position of a scaled element.

$.fn.positionScaled = function(scale, left, top){
    var element = $(this);

    var scaledWidth = element.width() * scale;
    var scaledHeight = element.height() * scale;

    var offsetLeft = (element.width() / 2) - (scaledWidth / 2);
    var offsetTop = (element.height() / 2) - (scaledHeight / 2);

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

$.fn.button = function(title) {
    return $(this)
        .addClass('button')
        .attr('type', 'button')
        .attr('value', title);
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

    return this.each(function(){
        $(this)
            .css('left', rect.left)
            .css('top', rect.top)
            .css('width', rect.width)
            .css('height', rect.height);
    });
};

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

function roundedRect(context, x, y, width, height, radius){
    context.beginPath();
    context.moveTo(x, y + radius);
    context.lineTo(x, y + height - radius);
    context.quadraticCurveTo(x, y + height, x + radius, y + height);
    context.lineTo(x + width - radius, y + height);
    context.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
    context.lineTo(x + width, y + radius);
    context.quadraticCurveTo(x + width, y, x + width - radius, y);
    context.lineTo(x + radius, y);
    context.quadraticCurveTo(x, y, x, y + radius);
    context.stroke();
}
