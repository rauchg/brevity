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

    addClass: function(class_){
        this.element.addClass(class_);
    },

    removeClass: function(class_){
        this.element.removeClass(class_);
    },

    toggle: function() {
        this.element.toggleClass('active');
    },

    setPosition: function(left, top) {
        this.element.setPosition(left, top);
    },

    setCenterPosition: function(centerLeft, centerTop) {
        this.element.setCenterPosition(centerLeft, centerTop);
    },

    remove: function() {
        this.element.remove();
    },

    get: function() {
        return this.element;
    }
});
