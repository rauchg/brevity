var Element = Class.extend({
    get: function() {
        return this.element;
    },

    appendTo: function(parent) {
        this.element.appendTo(parent);
    },

    remove: function() {
        this.element.remove();
    },

    addClass: function(class_) {
        this.element.addClass(class_);
    },

    removeClass: function(class_) {
        this.element.removeClass(class_);
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

    positionAround: function(x, y) {
        this.element.positionAround(x, y);
    }
});

