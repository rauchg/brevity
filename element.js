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

    remove: function() {
        this.element.remove();
    },

    get: function() {
        return this.element;
    }
});
