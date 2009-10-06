var DocumentTab = Element.extend({
    init: function() {
        this.element = $(document.createElement('a'))
            .data('documentTab', this);

        this.span = $(document.createElement('span'))
            .data('documentTab', this)
            .appendTo(this.element);

        this.input = $(document.createElement('input'))
            .data('documentTab', this)
            .addClass('text')
            .hide()
            .appendTo(this.element);
    },

    setDocument: function(document_) {
        this._document = document_;
    },

    getDocument: function() {
        return this._document;
    },

    showInput: function() {
        this.span.hide();
        this.input
            .attr('value', 'http://www.')
            .show();

        this.input
            .focus();
    },

    showTitle: function() {
        this.input.hide();
        this.span
            .text(this.input.attr('value'))
            .show();

        this.document.setUrl(this.input.attr('value'));
    },

    setTitle: function(title) {
        this.span.text(title);
    }
});
