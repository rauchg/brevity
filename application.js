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
        this.isFullscreen = false;
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
        this.applicationTab.addClass('active');
        this.documentList.addClass('active');

        if (this.activeDocument !== null)
            this.activeDocument.activate();

        this.setZIndexes(zIndex);
    },

    deactivate: function(zIndex){
        this.active = false;
        this.applicationTab.removeClass('active');
        this.documentList.removeClass('active');

        if (this.activeDocument !== null)
            this.activeDocument.deactivate();

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

    addDocument: function(document) {
        this.documents.push(document);
        document.getDocumentTab().appendTo(this.documentList);
        document.setZIndex(this.zIndex);
        this.activateDocument(document);
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

    activateDocument: function(document) {
        if (document === this.activeDocument)
            return;

        if (document === null) {
            this.activeDocument = null;
            return;
        }

        document.activate();

        for (var i = 0; i < this.documents.length; i++) {
            if (this.documents[i] !== document)
                this.documents[i].deactivate();
        }

        this.activeDocument = document;
    },

    getActiveDocument: function() {
        return this.activeDocument;
    },

    setZIndexes: function(zIndex) {
        for (var i = 0; i < this.documents.length; i++)
            this.documents[i].setZIndex(zIndex);

        this.overlay.css('zIndex', zIndex + 1000);
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

        if (this.isFullscreen === false) {
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

    // Runs for all applications when fullscreen occurs, not only for the one
    // to be displayed.

    fullscreen: function() {
        this.isFullscreen = true;
        this.resize();
    },

    wall: function(){
        this.isFullscreen = false;
        this.resize();
    },

    toggleFullscreen: function() {
        if (this.isFullscreen === true)
            this.wall();
        else
            this.fullscreen();
    },

    toggleBars: function() {
        this.barsHidden = !this.barsHidden;

        if (this.activeDocument === null)
            return;

        if (this.isFullscreen === true) {
            var top, height;

            if (this.barsHidden === true) {
                top = 0;
                height = window.innerHeight;
            }
            else {
                top = 22;
                height = window.innerHeight - 44;
            }

            if (this.active === true)
                this.activeDocument.setVerticalBounds(top, height, true);
            else
                this.activeDocument.setVerticalBounds(top, height);
        }
    }
});
