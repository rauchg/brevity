var Application = Class.extend({
    init: function(appDefinition, elements, initialZIndex){
        this.iframes = [];

        this.state = {};
        this.state.activeIframe = null;
        this.state.active = false;
        this.state.fullscreen = false;
        this.state.barsHidden = false;

        this.appDefinition = appDefinition;
        this.documentList = elements.nav;
        this.div = elements.div;
        this.a = elements.a;
        this.zIndex = initialZIndex;

        this.div
            .overlay(this)
            .addClass('application')
            .css('zIndex', initialZIndex)
            .css('top', 200)
            .css('left', 200)
            .hide();

        this.a
            .text(appDefinition.name)
            .data('application', this)

        this.documentList.bind('mouseover', function(e){
            var a = $(e.target);
            a.data('application').activateDocument(a.data('iframe'));
        });

        this.documentList.bind('mousedown', function(e){
            var element = $(e.target),
                a;

            if (element.is('span'))
                a = element.parent();
            else
                a = element;

            switch (e.button) {
                case 0:
                    a.data('span').hide();
                    a.data('input')
                        .show()
                        .attr('value', 'http://www.')
                        .focus();

                    break;
                case 2:
                    a.data('application').removeDocument(a.data('iframe'));
                    break;
            }

            event.preventDefault();
        });
    },

    remove: function(){
        for (var i = 0; i < this.iframes.length; i++)
            this.iframes[i].remove();

        this.iframes = null;
        this.documentList.remove();
        this.div.remove();
        this.a.remove();
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

    addDocument: function(elements) {
        elements.iframe
            .addClass('application')
            .attr('src', this.appDefinition.url)
            .data('a', elements.a);

        this.iframes.push(elements.iframe);

        elements.input
            .hide()
            .addClass('text');

        elements.input.bind('keydown', function(e){
            if (e.keyCode === 13) {
                elements.input.hide();
                elements.span.text(elements.input.attr('value'));
                elements.span.show();
                elements.iframe.attr('src', elements.input.attr('value'));
            }
        });

        elements.span.text(this.appDefinition.url);

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
