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

    positionScaled: function(scale, left, top){
        this.element.positionScaled(scale, left, top);
    },

    rectangle: function(rect){
        this.element.rectangle(rect);
    }
});
