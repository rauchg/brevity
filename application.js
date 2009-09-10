var Application = Class.extend({
    init: function(appDefinition, documentList, div, a, zIndex){
        this.iframes = [];

        this.state = {};

        this.state.activeIframe = null;
        this.state.active = false;
        this.state.fullscreen = false;
        this.state.barsHidden = false;

        this.appDefinition = appDefinition;
        this.documentList = documentList;
        this.div = div.overlay(this);
        this.a = a;
        this.zIndex = zIndex;

        div.addClass('application');
        div.css('zIndex', zIndex);
        div.css('top', 200);
        div.css('left', 200);
        div.hide();

        a.text(appDefinition.name);
        a.data('application', this);

        documentList.bind('mouseover', function(e){
            var a = $(e.target);
            a.data('application').activateDocument(a.data('iframe'));
        });

        documentList.bind('mousedown', function(e){
            var a = $(e.target);

            switch (e.button) {
                case 0:
                    break;
                case 2:
                    a.data('application').removeDocument(a.data('iframe'));
                    break;
            }
        });
    },

    activate: function(zIndex){
        this.state.active = true;
        this.a.opacity(1);
        this.documentList.show();

        if (this.state.activeIframe !== null) {
            this.state.activeIframe.opacity(1);
            this.state.activeIframe.show();
        }

        this.setZIndexes(zIndex);
    },

    deactivate: function(zIndex){
        this.endAnimation();

        this.state.active = false;
        this.a.opacity(0.5);
        this.documentList.hide();

        if (this.state.fullscreen === true) {
            if (this.state.activeIframe !== null)
                this.state.activeIframe
                    .hide()
                    .css('opacity', 0.75);
        }
        else {
            if (this.state.activeIframe !== null)
                this.state.activeIframe.fadeToExpo(500, 0.75);
        }

        this.setZIndexes(zIndex);
    },

    addDocument: function(iframe, a) {
        iframe.addClass('application');
        iframe.attr('src', this.appDefinition.url);
        iframe.data('a', a);
        this.iframes.push(iframe);

        a.text(this.appDefinition.url);
        a.data('iframe', iframe);
        a.data('application', this);
        a.appendTo(this.documentList);

        this.activateDocument(iframe);
    },

    removeDocument: function(iframe) {
        for (var i = 0; i < this.iframes.length; i++)
        {
            if (this.iframes[i] === iframe)
            {
                this.iframes.remove(i);
                break;
            }
        }
        iframe.data('a').remove();
        iframe.remove();

        if (this.iframes.length > 0)
            this.activateDocument(this.iframes[this.iframes.length - 1]);
        else
            this.activateDocument(null);
    },

    activateDocument: function(iframe) {
        if (iframe === null) {
            this.state.activeIframe = null;
            if (this.state.fullscreen === false)
                this.div.hide();
            return;
        }

        if (iframe === this.state.activeIframe)
            return;

        this.endAnimation();

        if (this.div.css('display') === 'none')
            this.div.show();

        iframe.data('a').opacity(1);
        iframe.opacity(1);
        iframe.show();

        for (var i = 0; i < this.iframes.length; i++) {
            if (this.iframes[i] !== iframe) {
                this.iframes[i].data('a').opacity(0.5);
                this.iframes[i].hide();
            }
        }

        this.state.activeIframe = iframe;
    },

    getActiveDocument: function() {
        return this.state.activeIframe;
    },

    setZIndexes: function(zIndex) {
        for (var i = 0; i < this.iframes.length; i++)
            this.iframes[i].css('zIndex', zIndex);

        this.div.css('zIndex', zIndex + 1000);

        this.zIndex = zIndex;
    },

    getZIndex: function() {
        return this.zIndex;
    },

    move: function(left, top) {
        for (var i = 0; i < this.iframes.length; i++) {
            this.iframes[i].css('left', left);
            this.iframes[i].css('top', top);
        }
    },

    resize: function() {
        this.endAnimation();

        var rect = {};

        if (this.state.fullscreen === true) {
            rect.left = 0;
            rect.width = window.innerWidth;

            if (this.state.barsHidden === true) {
                rect.top = 0;
                rect.height = window.innerHeight;
            }
            else {
                rect.top = 24;
                rect.height = window.innerHeight - 48;
            }
        }
        else {
            rect.left = this.div.css('left');
            rect.top = this.div.css('top');
            rect.width = window.innerWidth / 2;
            rect.height = window.innerHeight / 2;

            this.div.rectangle(rect);
        }

        for (var i = 0; i < this.iframes.length; i++)
            this.iframes[i].rectangle(rect);
    },

    // Runs for all application when fullscreen occurs, not only for the one
    // to be displayed.

    fullscreen: function() {
        $('body').addClass('fullscreen');
        this.state.fullscreen = true;
        this.div.hide();

        if (this.state.active === false) {
            if (this.state.activeIframe !== null)
                this.state.activeIframe.hide();
        }

        this.resize();
    },

    wall: function(){
        $('body').removeClass('fullscreen');
        this.state.fullscreen = false;
        this.endAnimation();

        if (this.state.active === false) {
            if (this.state.activeIframe !== null)
                this.state.activeIframe.show();
        }

        if (this.state.activeIframe !== null)
            this.div.show();

        this.resize();
    },

    toggleFullscreen: function() {
        if (this.state.fullscreen === true)
            this.wall();
        else
            this.fullscreen();
    },

    toggleBars: function() {
        this.state.barsHidden = !this.state.barsHidden;

        if (this.state.activeIframe === null)
            return;

        if (this.state.fullscreen === true) {
            if (this.state.barsHidden === true) {
                var top = 0;
                var height = window.innerHeight;
            }
            else {
                var top = 24;
                var height = window.innerHeight - 48;
            }

            if (this.state.active === true) {
                // TODO: This animation causes bugs in some cases when switching
                // between applications or documents. Fix it.

                this.endAnimation();
                this.state.activeIframe.animate({ top: top, height: height }, 250);
            }
            else {
                this.state.activeIframe
                    .css('top', top)
                    .css('height', height);
            }
        }
    },

    endAnimation: function() {
        if (this.state.activeIframe !== null)
            this.state.activeIframe.stop({ clearQueue: true });
    },

    click: function() {
        $(document).trigger('fullscreen');
    }
});
