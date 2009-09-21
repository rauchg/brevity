var Application = Class.extend({
    init: function(applicationDefinition, elements, zIndex){

        this.applicationDefinition = applicationDefinition;
        this.active = false;
        this.applicationListItem = elements.a
            .text(applicationDefinition.name)
            .data('application', this);

        // Documents are represented as iframes. It's allowed for an application
        // to not have any documents. Maximum one can be visible at the same
        // time. 
        this.documents = [];
        this.activeDocument = null;
        this.documentList = elements.nav;

        // Placed over active iframe to make it possible to drag the application
        // around. Hidden in fullscreen or in wall view if no document is
        // active.
        this.overlay = elements.div
            .overlay(this)
            .css('top', 200)
            .css('left', 200);

        // Highest z-index of all applications. Set on all iframes and overlay
        // when application is activated.
        this.zIndex = zIndex;

        // Cache state to avoid uneccessary use of selectors.
        this.isFullscreen = false;
        this.barsHidden = false;

        this.documentList.bind('mouseover', function(e){
            var item = $(e.target);
            item.data('application').activateDocument(item.data('iframe'));
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
                item.data('application').removeDocument(
                    item.data('iframe'));
                break;
            }

            event.preventDefault();
        });
    },

    remove: function(){
        for (var i = 0; i < this.documents.length; i++)
            this.documents[i].remove();

        this.documents = null;
        this.documentList.remove();
        this.overlay.remove();
        this.applicationListItem.remove();
    },

    activate: function(zIndex){
        this.active = true;
        this.applicationListItem.opacity(1);
        this.documentList.show();

        if (this.activeDocument !== null) {
            this.activeDocument
                .opacity(1)
                .show();
        }

        this.setZIndexes(zIndex);
    },

    deactivate: function(zIndex){
        this.endAnimation();

        this.active = false;
        this.applicationListItem.opacity(0.625);
        this.documentList.hide();

        if (this.activeDocument !== null) {
            if (this.isFullscreen === true) {
                this.activeDocument
                    .hide()
                    .css('opacity', 0.625);
            }
            else
                this.activeDocument.fadeToExpo(500, 0.625);
        }

        this.setZIndexes(zIndex);
    },

    addDocument: function(elements) {
        elements.iframe
            .addClass('application')
            .attr('src', this.applicationDefinition.url)
            .data('a', elements.a);

        this.documents.push(elements.iframe);

        elements.input
            .hide()
            .addClass('text');

        elements.input.bind('keydown', function(e){
            if (e.keyCode === 13) {
                elements.input.hide();
                elements.span
                    .text(elements.input.attr('value'))
                    .show();
                elements.iframe.attr('src', elements.input.attr('value'));
            }
        });

        elements.span.text(this.applicationDefinition.url);

        elements.a
            .data('iframe', elements.iframe)
            .data('span', elements.span)
            .data('input', elements.input)
            .data('application', this)
            .append(elements.span)
            .append(elements.input)
            .prependTo(this.documentList);

        this.activateDocument(elements.iframe);
    },

    removeDocument: function(iframe) {
        for (var i = 0; i < this.documents.length; i++) {
            if (this.documents[i] === iframe) {
                this.documents.remove(i);
                break;
            }
        }

        iframe.data('a').remove();
        iframe.remove();

        if (this.documents.length > 0)
            this.activateDocument(this.documents[this.documents.length - 1]);
        else
            this.activateDocument(null);
    },

    activateDocument: function(iframe) {
        if (iframe === null) {
            this.activeDocument = null;
            if (this.isFullscreen === false)
                this.overlay.hide();
            return;
        }

        if (iframe === this.activeDocument)
            return;

        this.endAnimation();

        if (this.overlay.css('display') === 'none')
            this.overlay.show();

        iframe.data('a').opacity(1);
        iframe
            .opacity(1)
            .show();

        for (var i = 0; i < this.documents.length; i++) {
            if (this.documents[i] !== iframe) {
                this.documents[i].data('a').opacity(0.625);
                this.documents[i].hide();
            }
        }

        this.activeDocument = iframe;
    },

    getActiveDocument: function() {
        return this.activeDocument;
    },

    setZIndexes: function(zIndex) {
        for (var i = 0; i < this.documents.length; i++)
            this.documents[i].css('zIndex', zIndex);

        this.overlay.css('zIndex', zIndex + 1000);

        this.zIndex = zIndex;
    },

    getZIndex: function() {
        return this.zIndex;
    },

    move: function(left, top) {
        for (var i = 0; i < this.documents.length; i++) {
            this.documents[i]
                .css('left', left)
                .css('top', top);
        }
    },

    resize: function() {
        this.endAnimation();

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
        this.endAnimation();

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

            if (this.active === true) {
                // TODO: This animation causes bugs in some cases when switching
                // between applications or documents before the animation has
                // ended. Fix it.

                this.endAnimation();
                this.activeDocument.animate({ top: top, height: height }, 250);
            }
            else {
                this.activeDocument
                    .css('top', top)
                    .css('height', height);
            }
        }
    },

    endAnimation: function() {
        if (this.activeDocument !== null)
            this.activeDocument.stop({ clearQueue: true, gotoEnd: true });
    }
});
