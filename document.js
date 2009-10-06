var Document = Element.extend({
    init: function(documentTab){
        this.documentTab = documentTab;

        // Set object reference to be used in the delegation event handler for
        // document list.

        documentTab.setDocument(this);

        this.element = $(document.createElement('iframe'));
    },

    setUrl: function(url) {
        this.element.attr('src', url);
        this.documentTab.setTitle(url);
    },

    getDocumentTab: function(){
        return this.documentTab;
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
