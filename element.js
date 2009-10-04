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

    remove: function() {
        this.element.remove();
    },

    get: function() {
        return this.element;
    }
});
