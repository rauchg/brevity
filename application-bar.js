var ApplicationBar = Bar.extend({
    init: function() {
        this._super();

        this.newApplicationButton = $(document.createElement('input'))
            .button('+')
            .appendTo(this.element);

        this.applicationList = $(document.createElement('nav'))
            .appendTo(this.element);

        this.right = $(document.createElement('div'))
            .addClass('right')
            .appendTo(this.element);

        this.clock = $(document.createElement('div'))
            .clock()
            .appendTo(this.right);
    },

    getNewApplicationButton: function() {
        return this.newApplicationButton;
    },

    getApplicationList: function() {
        return this.applicationList;
    },

    resize: function() {
        this.element
            .css('left', 0)
            .css('top', window.innerHeight - 22)
            .css('width', window.innerWidth)
            .css('height', 22);
    }
});

