var Application = Class.extend({
    init: function(brevity, applicationDefinition, initialZIndex){
        this.brevity = brevity;
        this.name = applicationDefinition.name;
        this.url = applicationDefinition.url;
        this.zIndex = initialZIndex;

        this.documents = [];
        this.activeDocument = null;

        this.initElements();
    },

    initElements: function(){
        this.overlay = $(document.createElement('div'))
            .applicationOverlay(this.brevity, this);

        this.applicationTab = $(document.createElement('a'))
            .data('application', this)
            .text(this.name);

        this.documentList = $(document.createElement('nav'))
            .documentList(this);
    },

    isActive: function(){
        return this.brevity.getActiveApplication() === this;
    },

    getName: function(){
        return this.name;
    },

    getUrl: function(){
        return this.url;
    },

    getOverlay: function(){
        return this.overlay;
    },

    getApplicationTab: function(){
        return this.applicationTab;
    },

    getDocumentList: function(){
        return this.documentList;
    },

    activate: function(zIndex){
        this.documentList.addClass('active');
        this.addClass('activeApplication');
        this.overlay.addClass('activeApplication');
        this.applicationTab.addClass('active');

        this.setZIndexes(zIndex);
    },

    addClass: function(class_){
        for (var i = 0; i < this.documents.length; i++)
            this.documents[i].addClass(class_);
    },

    removeClass: function(class_){
        for (var i = 0; i < this.documents.length; i++)
            this.documents[i].removeClass(class_);
    },

    deactivate: function(zIndex){
        this.documentList.removeClass('active');
        this.removeClass('activeApplication');
        this.applicationTab.removeClass('active');
        this.overlay.removeClass('activeApplication');

        this.setZIndexes(zIndex);
    },

    remove: function(){
        for (var i = 0; i < this.documents.length; i++)
            this.documents[i].remove();

        this.documents = null;

        this.documentList.remove();
        this.overlay.remove();
        this.applicationTab.remove();
    },

    addDocument: function(document_) {
        document_.getDocumentTab().appendTo(this.documentList);
        document_.setUrl(this.url);
        document_.setZIndex(this.zIndex);

        if (this.isActive() === true)
            document_.addClass('activeApplication');

        this.documents.push(document_);
    },

    removeDocument: function(document) {
        for (var i = 0; i < this.documents.length; i++) {
            if (this.documents[i] === document) {
                this.documents.remove(i);
                break;
            }
        }

        document.remove();

        if (this.documents.length > 0)
            this.activateDocument(this.documents[this.documents.length - 1]);
        else
            this.activateDocument(null);
    },

    activateDocument: function(document_) {
        if (document_ === this.activeDocument)
            return;

        if (document_ === null) {
            this.activeDocument = null;
            return;
        }

        document_.activate();

        for (var i = 0; i < this.documents.length; i++) {
            if (this.documents[i] !== document_)
                this.documents[i].deactivate();
        }

        this.activeDocument = document_;
    },

    getActiveDocument: function() {
        return this.activeDocument;
    },

    setZIndexes: function(zIndex) {
        for (var i = 0; i < this.documents.length; i++)
            this.documents[i].setZIndex(zIndex);

        this.overlay.css('zIndex', zIndex +  1000);
        this.zIndex = zIndex;
    },

    getZIndex: function() {
        return this.zIndex;
    },

    positionScaled: function(scale, left, top) {
        for (var i = 0; i < this.documents.length; i++)
            this.documents[i].positionScaled(scale, left, top);
    },

    resize: function() {
        var rect = {};

        if (this.brevity.isFullscreen() === true) {
            rect = {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            }

            if (this.brevity.areBarsHidden() === false) {
                rect.top += 22;
                rect.height -= 44;
            }
        }
        else {
            rect = {
                left: this.overlay.css('left'),
                top: this.overlay.css('top'),
                width: window.innerWidth / 2,
                height: window.innerHeight / 2
            };

            this.overlay.rectangle(rect);
        }

        for (var i = 0; i < this.documents.length; i++)
            this.documents[i].rectangle(rect);
    }
});
