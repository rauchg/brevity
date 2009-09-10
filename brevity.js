var appDefinitions = [
[
    {
        name: 'Search',
        url: 'http://www.google.com/'
    },
    {
        name: 'Music',
        url: 'http://www.rollingstone.com/'
    },
    {
        name: 'Photo',
        url: 'http://www.flickr.com/'
    }
],
[
    {
        name: 'Search',
        url: 'http://www.google.com/'
    },
    {
        name: 'Search',
        url: 'http://www.google.com/'
    },
    {
        name: 'Search',
        url: 'http://www.google.com/'
    }
],
[
    {
        name: 'Search',
        url: 'http://www.google.com/'
    },
    {
        name: 'Search',
        url: 'http://www.google.com/'
    },
    {
        name: 'Search',
        url: 'http://www.google.com/'
    }
]];

var applications = [],
documentBar,
applicationBar,
applicationList;

$(function(){
    documentBar = $('#documentBar').bar('top');
    applicationBar = $('#applicationBar').bar('bottom');
    applicationList = $('#applicationList');

    var application1 = createApplication(appDefinitions[0][0]);
    createDocument(application1);

    var application2 = createApplication(appDefinitions[0][1]);
    createDocument(application2);
    createDocument(application2);

    var application3 = createApplication(appDefinitions[0][2]);
    createDocument(application3);

    activate(application2);

    $(window).trigger('resize');
});

function createApplication(appDefinition) {
    var nav = $.create.nav();
    var div = $.create.div();
    var a = $.create.a();

    var application = new Application(
        appDefinition,
        nav,
        div,
        a,
        applications.length);

    applications.push(application);

    nav.appendTo(documentBar);
    div.appendTo('body');
    a.appendTo(applicationList);

    return application;
}

function createDocument(application) {
    var iframe = $.create.iframe();
    var a = $.create.a();

    application.addDocument(iframe, a);

    iframe.appendTo('body');
}

function activate(application) {
    applications.sort(function(a, b){
        return a.getZIndex() - b.getZIndex();
    });

    var zIndex = 0;

    for (var i = 0; i < applications.length; i++)
    {
        if (applications[i] !== application)
            applications[i].deactivate(zIndex++);
    }

    application.activate(zIndex);
}

$('#applicationList').live('mouseover', function(e){
    var a = $(e.target);
    activate(a.data('application'));
});

$('#applicationList').live('click', function(e){
    $(document).trigger('togglefullscreen');
});

$(document).bind('appactivate', function(e, application){
    activate(application);
});

$(document).bind('fullscreen', function(){
    for (var i = 0; i < applications.length; i++)
        applications[i].fullscreen();
});

$(document).bind('wall', function(){
    for (var i = 0; i < applications.length; i++)
        applications[i].wall();
});

$(document).bind('togglefullscreen', function(){
    for (var i = 0; i < applications.length; i++)
        applications[i].toggleFullscreen();
});

$(document).bind('keydown', 'ctrl+shift+space', function(){
    $(document).trigger('togglefullscreen');
});

$(document).bind('keydown', 'alt+f', function(){
    $('.bar').trigger('bartoggle');

    for (var i = 0; i < applications.length; i++)
        applications[i].toggleBars();
});

$(window).bind('contextmenu', function() {
    return false;
});

$(window).resize(function(){
    for (var i = 0; i < applications.length; i++)
        applications[i].resize();
});
