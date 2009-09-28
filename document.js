var Document = Class.extend({
    init: function(url){
        this.url = url;
        this.documentTab = $.create('a');

        this.iframe = $.create('iframe')
            .addClass('application')
            .attr('src', this.url)
            .data('a', this.documentTab)
            .appendTo('body');

        this.span = $.create('span').text(this.url);

        this.input = $.create('input')
            .hide()
            .addClass('text');

        // Is there a better way to do this?

        var input = this.input;
        var span = this.span;
        var iframe = this.iframe;

        this.input.bind('keydown', function(e){
            if (e.keyCode === 13) {
                input.hide();
                span
                    .text(input.attr('value'))
                    .show();
                iframe.attr('src', input.attr('value'));
            }
        });

        this.documentTab
            .data('iframe', this.iframe)
            .data('span', this.span)
            .data('input', this.input)
            .data('document', this)
            .append(this.span)
            .append(this.input);
    },

    getDocumentTab: function(){
        return this.documentTab;
    },

    remove: function(){
        this.iframe.remove();
        this.documentTab.remove();
    },

    activate: function(){
        this.documentTab.opacity(1);
        this.iframe
            .opacity(1)
            .show();
    },

    deactivate: function(){
        this.documentTab.opacity(0.625);
        this.iframe.hide();
    },

    deactivateApplicationFullscreen: function(){
        this.iframe
            .hide()
            .css('opacity', 0.625);
    },

    deactivateApplicationWall: function(){
        this.iframe.fadeToExpo(500, 0.625);
    },

    hide: function(){
        this.iframe.hide();
    },

    show: function(){
        this.iframe.show();
    },

    setZIndex: function(zIndex){
        this.iframe.css('zIndex', zIndex);
    },

    move: function(left, top){
        this.iframe
            .css('left', left)
            .css('top', top);
    },

    setVerticalBounds: function(top, height, animate){
        this.iframe.stop({ clearQueue: true });
        if (animate === true)
            this.iframe.animate({ top: top, height: height }, 250);
        else
            this.iframe.css('top', top).css('height', height);
    },

    rectangle: function(rect){
        this.iframe.rectangle(rect);
    }
});
