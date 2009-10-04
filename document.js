var Document = Class.extend({
    init: function(url){
        this.url = url;
        this.documentTab = null;

        this.element = $(document.createElement('iframe'))
            .attr('src', this.url)
            .appendTo('body');
    },

    setUrl: function(url) {
        this.url = url;
        this.element.attr('src', url);
    },

    setDocumentTab: function(documentTab){
        this.documentTab = documentTab;
    },

    getTitle: function(){
        return this.url;
    },

    remove: function(){
        this.documentTab.remove();
        this.element.remove();
    },

    addActiveApplicationClass: function(){
        this.element.addClass('activeApplication');
    },

    removeActiveApplicationClass: function(){
        this.element.removeClass('activeApplication');
    },

    activate: function(){
        this.documentTab.activate();
        this.element.addClass('activeDocument');
    },

    deactivate: function(){
        this.documentTab.deactivate();
        this.element.removeClass('activeDocument');
    },

    setZIndex: function(zIndex){
        this.element.css('zIndex', zIndex);
    },

    move: function(left, top){
        this.element
            .css('left', left)
            .css('top', top);
    },

    setVerticalBounds: function(top, height, animate){
        this.element.stop({ clearQueue: true });
        if (animate === true)
            this.element.animate({ top: top, height: height }, 250);
        else
            this.element
                .css('top', top)
                .css('height', height);
    },

    rectangle: function(rect){
        this.element.rectangle(rect);
    }
});
