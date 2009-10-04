var DocumentTab = Element.extend({
    init: function(document_) {
        this.document = document_;

        this.element = $(document.createElement('a'))
            .data('documentTab', this);

        this.span = $(document.createElement('span'))
            .data('documentTab', this)
            .text(document_.getTitle())
            .appendTo(this.element);

        this.input = $(document.createElement('input'))
            .data('documentTab', this)
            .addClass('text')
            .hide()
            .appendTo(this.element);
    },

    getDocument: function() {
        return this.document;
    },

    showInput: function() {
        this.span.hide();
        this.input
            .attr('value', 'http://www.')
            .show()
            .focus();
    },

    showTitle: function() {
        this.input.hide();
        this.span
            .text(this.input.attr('value'))
            .show();

        this.document.setUrl(this.input.attr('value'));
    }
});
