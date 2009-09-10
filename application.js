var Application = Class.extend({
    init: function(appDefinition, documentList, div, a, zIndex){
        this.iframes = [];

        this.state = {};

        this.state.activeIframe = null;
        this.state.lastActiveIframe = null;
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

        if (this.state.fullscreen === true)
            this.state.activeIframe
                .hide()
                .css('opacity', 0.75);
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
        alert(this.iframes.length);

        //this.activateDocument(this.state.lastActiveIframe);

        iframe.data('a').fadeOut('normal', function() {
            iframe.data('a').remove();
        });

        var iframes = this.iframes;
        iframe.fadeOut('normal', function() {
            var i;
            for (i = 0; i < iframes.length; i++)
            {
                if (iframes[i] === iframe)
                    break;
            }
            iframes.remove(i);
            iframe.remove();
        });
    },

    activateDocument: function(iframe) {
        if (iframe === this.state.activeIframe)
            return;

        this.endAnimation();

        iframe.data('a').opacity(1);
        iframe.opacity(1);
        iframe.show();

        for (var i = 0; i < this.iframes.length; i++) {
            if (this.iframes[i] !== iframe) {
                this.iframes[i].data('a').opacity(0.5);
                this.iframes[i].hide();
            }
        }

        this.state.lastActiveIframe = this.state.activeIframe;
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
            this.div
                .css('width', window.innerWidth / 2)
                .css('height', window.innerHeight / 2);

            rect = this.div.rectangle();
        }

        for (var i = 0; i < this.iframes.length; i++)
            this.iframes[i].rectangle(rect);
    },

    fullscreen: function() {
        this.state.fullscreen = true;

        if (this.state.active === false) {
            if (this.state.activeIframe !== null)
                this.state.activeIframe.hide();
        }

        this.div.hide();

        for (var i = 0; i < this.iframes.length; i++)
            this.iframes[i].addClass('fullscreen');

        this.resize();
    },

    wall: function(){
        this.endAnimation();

        this.state.fullscreen = false;

        if (this.state.active === false) {
            if (this.state.activeIframe !== null)
                this.state.activeIframe.show();
        }

        this.div.show();

        for (var i = 0; i < this.iframes.length; i++)
            this.iframes[i].removeClass('fullscreen');

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
