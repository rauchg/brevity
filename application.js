var Application = Class.extend({
    init: function(brevity, applicationDefinition, documentList, applicationTab, overlay, zIndex){

        this.applicationDefinition = applicationDefinition;

        this.applicationTab = applicationTab
            .data('application', this)
            .text(applicationDefinition.name);

        this.documentList = documentList.documentList(this);
        this.overlay = overlay.applicationOverlay(brevity, this);
        this.zIndex = zIndex;

        this.active = false;
        this.documents = [];
        this.activeDocument = null;
        this.barsHidden = false;
    },

    getUrl: function(){
        return this.applicationDefinition.url;
    },

    getName: function(){
        return this.applicationDefinition.name;
    },

    activate: function(zIndex){
        this.active = true;

        this.documentList.addClass('active');

        for (var i = 0; i < this.documents.length; i++)
            this.documents[i].addActiveApplicationClass();

        this.applicationTab.addClass('active');

        this.setZIndexes(zIndex);
    },

    deactivate: function(zIndex){
        this.active = false;

        this.documentList.removeClass('active');

        for (var i = 0; i < this.documents.length; i++)
            this.documents[i].removeActiveApplicationClass();

        this.applicationTab.removeClass('active');

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
        var documentTab = new DocumentTab(document_);
        documentTab.appendTo(this.documentList);
        document_.setDocumentTab(documentTab);
        this.documents.push(document_);
        document_.setZIndex(this.zIndex);
        this.activateDocument(document_);
        if (this.active === true)
            document_.addActiveApplicationClass();
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

    move: function(left, top) {
        for (var i = 0; i < this.documents.length; i++)
            this.documents[i].move(left, top);
    },

    resize: function() {
        var rect = {};

        if ($('body').hasClass('fullscreen') === false) {
            rect.left = this.overlay.css('left');
            rect.top = this.overlay.css('top');
            rect.width = window.innerWidth / 2;
            rect.height = window.innerHeight / 2;

            this.overlay.rectangle(rect);
        }
        else {
            rect.left = 0;
            rect.width = window.innerWidth;

            if (this.barsHidden === false) {
                rect.top = 22;
                rect.height = window.innerHeight - 44;
            }
            else {
                rect.top = 0;
                rect.height = window.innerHeight;
            }
        }

        for (var i = 0; i < this.documents.length; i++)
            this.documents[i].rectangle(rect);
    },

    toggleBars: function() {
        this.barsHidden = !this.barsHidden;

        if (this.activeDocument === null)
            return;

        if ($('body').hasClass('fullscreen') === true) {
            var top, height;

            if (this.barsHidden === true) {
                top = 0;
                height = window.innerHeight;
            }
            else {
                top = 22;
                height = window.innerHeight - 44;
            }

            for (var i = 0; i < this.documents.length; i++) {
                if (this.active === true && this.documents[i] === this.activeDocument)
                    this.activeDocument.setVerticalBounds(top, height, true);
                else
                    this.documents[i].setVerticalBounds(top, height);
            }
        }
    }
});
