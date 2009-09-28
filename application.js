var Application = Class.extend({
    init: function(applicationDefinition, zIndex){

        this.applicationDefinition = applicationDefinition;
        this.active = false;
        this.applicationTab = $.create('a')
            .text(applicationDefinition.name)
            .data('application', this);

        // It's allowed for an application to not have any documents. Maximum
        // one can be visible at the same time. 
        this.documents = [];
        this.activeDocument = null;
        this.documentList = $.create('nav');

        // Placed over active iframe to make it possible to drag the application
        // around. Hidden in fullscreen or in wall view if no document is
        // active.
        this.overlay = $.create('div')
            .overlay(this)
            .css('top', 200)
            .css('left', 200)
            .appendTo('body');

        // Highest z-index of all applications. Set on all iframes and overlay
        // when application is activated.
        this.zIndex = zIndex;

        // Cache state to avoid uneccessary use of selectors.
        this.isFullscreen = false;
        this.barsHidden = false;

        var application = this;
        this.documentList.bind('mouseover', function(e){
            var item = $(e.target);
            if (item.is('a'))
                application.activateDocument(item.data('document'));
        });

        this.documentList.bind('mousedown', function(e){
            var item = $(e.target);

            if (item.is('span'))
                item = item.parent();

            switch (e.button) {
            case 0:
                item.data('span').hide();
                item.data('input')
                    .attr('value', 'http://www.')
                    .show()
                    .focus();

                break;
            case 2:
                application.removeDocument(item.data('document'));
                break;
            }

            e.preventDefault();
        });
    },

    getApplicationTab: function(){
        return this.applicationTab;
    },

    getDocumentList: function(){
        return this.documentList;
    },

    getUrl: function(){
        return this.applicationDefinition.url;
    },

    remove: function(){
        for (var i = 0; i < this.documents.length; i++)
            this.documents[i].remove();

        this.documents = null;
        this.documentList.remove();
        this.overlay.remove();
        this.applicationTab.remove();
    },

    activate: function(zIndex){
        this.active = true;
        this.applicationTab.opacity(1);
        this.documentList.show();

        if (this.activeDocument !== null)
            this.activeDocument.activate();

        this.setZIndexes(zIndex);
    },

    deactivate: function(zIndex){
        this.active = false;
        this.applicationTab.opacity(0.625);
        this.documentList.hide();

        if (this.activeDocument !== null) {
            if (this.isFullscreen === true)
                this.activeDocument.deactivateApplicationFullscreen();
            else
                this.activeDocument.deactivateApplicationWall();
        }

        this.setZIndexes(zIndex);
    },

    addDocument: function(document) {
        this.documents.push(document);
        document.getDocumentTab().prependTo(this.documentList);
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
            if (this.isFullscreen === false)
                this.overlay.hide();
            return;
        }

        if (this.overlay.css('display') === 'none')
            this.overlay.show();

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
        $('body').addClass('fullscreen');
        this.isFullscreen = true;
        this.overlay.hide();

        if (this.active === false) {
            if (this.activeDocument !== null)
                this.activeDocument.hide();
        }

        this.resize();
    },

    wall: function(){
        $('body').removeClass('fullscreen');
        this.isFullscreen = false;

        if (this.active === false) {
            if (this.activeDocument !== null)
                this.activeDocument.show();
        }

        if (this.activeDocument !== null)
            this.overlay.show();

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
