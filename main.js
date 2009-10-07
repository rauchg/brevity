var applicationDefinitions = [
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
    var wall = new Wall();
    var documentBar = new DocumentBar();
    var applicationBar = new ApplicationBar();
    var brevity = new Brevity(wall, documentBar, applicationBar);
    var applicationGrid = new ApplicationGrid(brevity, applicationDefinitions);

    wall.activate();
    documentBar.activate();
    applicationBar.activate();

    wall.appendTo('body');
    documentBar.appendTo('body');
    applicationBar.appendTo('body');
    applicationGrid.appendTo('body');

    var resizeable = [
        wall,
        documentBar,
        applicationBar,
        brevity
    ];

    $(window).bind('contextmenu', function(){
        return false;
    });

    $(document).bind('keydown', 'ctrl+space', function(){
        brevity.toggleFullscreen();
    });

    $(document).bind('keydown', 'space', function(){
        brevity.fullscreen();
    });

    $(document).bind('keydown', 'alt+f', function(){
        applicationBar.toggle();
        documentBar.toggle();
        brevity.toggleBars();
    });

    $(window).bind('resize', function(){
        for (var i = 0; i < resizeable.length; i++)
            resizeable[i].resize();
    });

    $(window).trigger('resize');

    wall.get().mousedown(function(e){
        if (applicationGrid.isActive() === true) {
            applicationGrid.deactivate();
            return;
        }

        applicationGrid.setCenterPosition(e.clientX, e.clientY);
        applicationGrid.activate();
    });

    documentBar.getNewDocumentButton().click(function(e){
        if (brevity.getActiveApplication() !== null) {
            brevity.createDocument(brevity.getActiveApplication());
            brevity.getActiveApplication().resize();
        }
    });

    documentBar.getToggleFullscreenButton().click(function(e){
        brevity.toggleFullscreen();
    });

    applicationBar.getNewApplicationButton().click(function(e){
        if (applicationGrid.isActive() === true) {
            applicationGrid.deactivate();
            return;
        }

        applicationGrid.setPosition(0, window.innerHeight - 22 - applicationGrid.get().height());
        applicationGrid.activate();
    });

    applicationBar.getApplicationList().mousedown(function(e){
        var element = $(e.target);
        var application = element.data('application');

        switch (e.button) {
            case 0:
                if (application === brevity.getActiveApplication())
                    brevity.toggleFullscreen();
                else
                    brevity.activateApplication(application);
                break;
            case 2:
                brevity.removeApplication(application);
                break;
        }
    });
});

