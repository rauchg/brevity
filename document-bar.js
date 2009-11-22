var DocumentBar = Element.extend({
    init: function() {
        this.element = $(document.createElement('div')).addClass('bar');

        this.newDocumentButton = $(document.createElement('input'))
            .button('+')
            .appendTo(this.element);

        this.right = $(document.createElement('div'))
            .addClass('right')
            .appendTo(this.element);

        this.toggleFullscreenButton = $(document.createElement('input'))
            .button('[]')
            .appendTo(this.right);
    },

    getNewDocumentButton: function() {
        return this.newDocumentButton;
    },

    getToggleFullscreenButton: function() {
        return this.toggleFullscreenButton;
    },

    resize: function() {
        this.element
            .css('left', 0)
            .css('top', 0)
            .css('width', window.innerWidth)
            .css('height', 22);
    }
});

