$(function(){
    var main = new Main();
});

var Main = Class.extend({
    init: function() {
        this.initCreate();
        this.initActivate();
        this.initAppend();
        this.initResizeable();

        this.initWindowEvents();
        this.initKeyEvents();
        this.initMouseEvents();

        $(window).trigger('resize');
    },

    initCreate: function() {
        this.wall = new Wall();
        this.documentBar = new DocumentBar();
        this.applicationBar = new ApplicationBar();
        this.brevity = new Brevity(
            this.wall,
            this.documentBar,
            this.applicationBar);
        this.applicationGrid = new ApplicationGrid(
            this.brevity,
            applicationDefinitions);
    },

    initActivate: function() {
        this.wall.activate();
        this.documentBar.activate();
        this.applicationBar.activate();
    },

    initAppend: function() {
        this.wall.appendTo('body');
        this.documentBar.appendTo('body');
        this.applicationBar.appendTo('body');
        this.applicationGrid.appendTo('body');
    },

    initResizeable: function() {
        this.resizeable = [
            this.wall,
            this.documentBar,
            this.applicationBar,
            this.brevity
        ];
    },

    initWindowEvents: function() {
        var that = this;

        $(window).bind('contextmenu', function(){
            return false;
        });

        $(window).bind('resize', function(){
            for (var i = 0; i < that.resizeable.length; i++)
                that.resizeable[i].resize();
        });
    },

    initKeyEvents: function() {
        var that = this;

        $(document).bind('keydown', 'ctrl+space', function(){
            that.brevity.toggleFullscreen();
        });

        $(document).bind('keydown', 'space', function(){
            that.brevity.fullscreen();
        });

        $(document).bind('keydown', 'alt+f', function(){
            that.applicationBar.toggle();
            that.documentBar.toggle();
            that.brevity.toggleBars();
        });
    },

    initMouseEvents: function() {
        var that = this;

        this.wall.get().mousedown(function(e){
            if (that.applicationGrid.isActive() === true) {
                that.applicationGrid.deactivate();
                return;
            }

            that.applicationGrid.positionAround(e.clientX, e.clientY);
            that.applicationGrid.activate();
        });

        this.documentBar.getNewDocumentButton().click(function(e){
            if (that.brevity.getActiveApplication() !== null) {
                that.brevity.createDocument(that.brevity.getActiveApplication());
                that.brevity.getActiveApplication().resize();
            }
        });

        this.documentBar.getToggleFullscreenButton().click(function(e){
            that.brevity.toggleFullscreen();
        });

        this.applicationBar.getNewApplicationButton().click(function(e){
            if (that.applicationGrid.isActive() === true) {
                that.applicationGrid.deactivate();
                return;
            }

            that.applicationGrid.get()
                .css('left', 0)
                .css('top', window.innerHeight - 22 - that.applicationGrid.get().height());

            that.applicationGrid.activate();
        });

        this.applicationBar.getApplicationList().mouseover(function(e){
            var element = $(e.target);
            var application = element.data('application');
            $('iframe').removeClass('preview');
            application.addClass('preview');
        });

        this.applicationBar.getApplicationList().mouseleave(function(e){
            $('iframe').removeClass('preview');
        });

        this.applicationBar.getApplicationList().mousedown(function(e){
            var element = $(e.target);
            var application = element.data('application');

            switch (e.button) {
                case 0:
                    if (application === that.brevity.getActiveApplication())
                        that.brevity.toggleFullscreen();
                    else {
                        that.brevity.activateApplication(application);
                        if (that.brevity.isFullscreen() === false)
                            that.brevity.toggleFullscreen();
                    }
                    break;
                case 2:
                    that.brevity.removeApplication(application);
                    break;
            }
        });
    }
});

