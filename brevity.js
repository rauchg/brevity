var appDefinitions = [
[
    {  name: 'Search',
       url: 'http://www.google.com/' },
    {  name: 'Type',
       url: 'applications/type.html' },
    {  name: 'Photo',
       url: 'http://www.flickr.com/' }
],
[
    {  name: 'Music',
       url: 'http://www.rollingstone.com' },
    {  name: 'Web',
       url: 'http://www.google.com/' },
    {  name: 'Photo',
       url: 'applications/photo.html' }
],
[
    {  name: 'Search',
       url: 'http://www.google.com/' },
    {  name: 'Search',
       url: 'http://www.google.com/' },
    {  name: 'Search',
       url: 'http://www.google.com/' }
]];

$(function(){
    new Brevity();
});

var Brevity = Class.extend({
    init: function(){
        this.applications = [];
        this.activeApplication = null;

        $('#documentBar').documentBar(this);
        $('#applicationBar').applicationBar(this);
        $('#applicationGrid').applicationGrid(this, appDefinitions);
        //$('#search').wallSearch(this);

        var context = document.getElementById('toggleFullscreenCanvas').getContext('2d');
        context.strokeStyle = 'rgba(255,255,255,0.625)';
        roundedRect(context, 2, 2, 18, 18, 6);
        
        var applications = this.applications;
        $(window).resize(function(){
            $('div#wall')
                .css('left', 0)
                .css('top', 0)
                .css('width', window.innerWidth)
                .css('height', window.innerHeight);

            for (var i = 0; i < applications.length; i++)
                applications[i].resize();
        });


        var brevity = this;
        $(document).bind('keydown', 'ctrl+space', function(){
            brevity.toggleFullscreen();
        });

        $(document).bind('keydown', 'space', function(){
            brevity.fullscreen();
        });

        $(document).bind('keydown', 'alt+f', function(){
            brevity.toggleBars();
        });

        $(window).bind('contextmenu', function(){
            return false;
        });

        $(window).trigger('resize');
    },

    createApplication: function(appDefinition) {
        var documentList = $(document.createElement('nav'))
            .appendTo($('#documentBar'));
        var applicationTab = $(document.createElement('a'))
            .appendTo($('#applicationList'));
        var overlay = $(document.createElement('div'))
            .appendTo('body');

        var application = new Application(
            this,
            appDefinition,
            documentList,
            applicationTab,
            overlay,
            this.applications.length);

        this.applications.push(application);

        return application;
    },

    activateApplication: function(application) {
        this.applications.sort(function(a, b){
            return a.getZIndex() - b.getZIndex();
        });

        var zIndex = 0;

        for (var i = 0; i < this.applications.length; i++) {
            if (this.applications[i] !== application)
                this.applications[i].deactivate(zIndex++);
        }

        application.activate(zIndex);

        this.activeApplication = application;
    },

    getActiveApplication: function() {
        return this.activeApplication;
    },

    createDocument: function(application) {
        application.addDocument(new Document(application.getUrl()));
    },

    removeApplication: function(application) {
        for (var i = 0; i < this.applications.length; i++) {
            if (this.applications[i] === application) {
                this.applications.remove(i);
                break;
            }
        }
        application.remove();
        if ((this.applications.length === 0) && $('body').hasClass('fullscreen'))
            this.wall();
    },

    fullscreen: function() {
        $('body').addClass('fullscreen');

        for (var i = 0; i < this.applications.length; i++)
            this.applications[i].fullscreen();
    },

    wall: function() {
        $('body').removeClass('fullscreen');

        for (var i = 0; i < this.applications.length; i++)
            this.applications[i].wall();
    },

    toggleFullscreen: function(){
        $('body').toggleClass('fullscreen');

        for (var i = 0; i < this.applications.length; i++)
            this.applications[i].toggleFullscreen();
    },

    toggleBars: function(){
        $('.bar').trigger('toggle');

        for (var i = 0; i < this.applications.length; i++)
            this.applications[i].toggleBars();
    }
});
