var Document = Class.extend({
    init: function(url){
        this.url = url;

        this.documentTab = $(document.createElement('a')).documentTab(this.url);

        this.iframe = $(document.createElement('iframe'))
            .addClass('application')
            .attr('src', this.url)
            .data('a', this.documentTab)
            .appendTo('body');

        // Is there a better way to do this?

        this.input = this.documentTab.find('input');
        this.span = this.documentTab.find('span');
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
        this.documentTab.remove();
        this.iframe.remove();
    },

    activate: function(){
        this.documentTab.addClass('active');
        this.iframe.addClass('active');
    },

    deactivate: function(){
        this.documentTab.removeClass('active');
        this.iframe.removeClass('active');
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
