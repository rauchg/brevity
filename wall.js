var Wall = Element.extend({
    init: function() {
        this.element = $(document.createElement('div')).attr('id', 'wall');
    },

    resize: function() {
        this.element
            .css('top', 0)
            .css('left', 0)
            .css('width', window.innerWidth)
            .css('height', window.innerHeight);
    }
});

