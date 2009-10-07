var Element = Class.extend({
    appendTo: function(parent) {
        this.element.appendTo(parent);
    },

    activate: function() {
        this.element.addClass('active');
    },

    deactivate: function() {
        this.element.removeClass('active');
    },

    isActive: function() {
        return this.element.hasClass('active');
    },

    toggle: function() {
        this.element.toggleClass('active');
    },

    setPosition: function(left, top) {
        this.element
            .css('left', left)
            .css('top', top);
    },

    setCenterPosition: function(centerLeft, centerTop) {
        var left = centerLeft - (this.element.width() / 2);
        var top = centerTop - (this.element.height() / 2);

        this.setPosition(
            $.range(left, left + this.element.width(), 0, window.innerWidth),
            $.range(top, top + this.element.height(), 0, window.innerHeight));
    },

    remove: function() {
        this.element.remove();
    },

    get: function() {
        return this.element;
    }
});
