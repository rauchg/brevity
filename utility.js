// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

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

// Used to keep a box within e.g. the screen range. Has to be called once for
// left (a) and right (b), and another time for top (a) and bottom (b). Returns
// the value to be used for left (a) or top (a), respectively.

$.range = function(a, b, lower, upper) {
    if (Math.max(a, lower) === lower)
        return lower;
    else if (Math.min(b, upper) === upper)
        return upper - (b - a);
    else
        return a;
}
})(jQuery);

function roundedRect(ctx,x,y,width,height,radius){
  ctx.beginPath();
  ctx.moveTo(x,y+radius);
  ctx.lineTo(x,y+height-radius);
  ctx.quadraticCurveTo(x,y+height,x+radius,y+height);
  ctx.lineTo(x+width-radius,y+height);
  ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
  ctx.lineTo(x+width,y+radius);
  ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
  ctx.lineTo(x+radius,y);
  ctx.quadraticCurveTo(x,y,x,y+radius);
  ctx.stroke();
}
