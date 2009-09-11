var appDefinitions = [
[
    {
        name: 'Search',
        url: 'http://www.google.com/'
    },
    {
        name: 'Type',
        url: 'type.html'
    },
    {
        name: 'Photo',
        url: 'http://www.flickr.com/'
    }
],
[
    {
        name: 'Music',
        url: 'http://www.rollingstone.com'
    },
    {
        name: 'Web',
        url: 'http://www.google.com/'
    },
    {
        name: 'Photo',
        url: 'photo.html'
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
newDocument,
newApplication,
applicationBar,
applicationList,
applicationGrid;

var state = {};
state.active = null;

function updateClock() {
    var now = new Date();

    $('#clock').text(
        leadingZero(now.getHours()) + ':' +
        leadingZero(now.getMinutes()));

    window.setTimeout(function() {
        updateClock();
    }, 1000);
}

function leadingZero(n) {
    if (n < 10)
        return '0' + n;
    else
        return n;
}

$(function(){
    updateClock();

    documentBar = $('#documentBar').bar('top');
    applicationBar = $('#applicationBar').bar('bottom');
    applicationList = $('#applicationList');
    newDocument = $('#newDocument');
    newApplication = $('#newApplication');
    applicationGrid = $('#applicationGrid');

    setupApplicationGrid();

    $(window).trigger('resize');
});

function createApplication(appDefinition) {
    var elements = {};

    elements.nav = $.create.nav();
    elements.div = $.create.div();
    elements.a = $.create.a();

    var application = new Application(
        appDefinition,
        elements,
        applications.length);

    applications.push(application);

    elements.nav.appendTo(documentBar);
    elements.div.appendTo('body');
    elements.a.prependTo(applicationList);

    return application;
}

function removeApplication(application) {
    for (var i = 0; i < applications.length; i++) {
        if (applications[i] === application) {
            applications.remove(i);
            break;
        }
    }
    application.remove();
}

function createDocument(application) {
    var elements = {};

    elements.iframe = $.create.iframe();
    elements.a = $.create.a();
    elements.span = $.create.span();
    elements.input = $.create.input();

    application.addDocument(elements);

    elements.iframe.appendTo('body');
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

    state.active = application;
}

function setupApplicationGrid()
{
    for (var i = 0; i < appDefinitions.length; i++)
    {
        var row = $(document.createElement('tr'));
        for (var j = 0; j < appDefinitions[i].length; j++)
        {
            var td = $(document.createElement('td'));

            td
                .text(appDefinitions[i][j].name)
                .data('appDefinition', appDefinitions[i][j])
                .appendTo(row);
        }
        row.appendTo(applicationGrid);
    }
}

$('#applicationGrid').live('click', function(e){
    $(e.target).data('appDefinition');
    var application = createApplication($(e.target).data('appDefinition'));
    createDocument(application);
    activate(application);
    $(document).trigger('fullscreen');
    applicationGrid.fadeOut();
});

$('#applicationList').live('mouseover', function(e){
    activate($(e.target).data('application'));
});

$('#applicationList').live('mousedown', function(e){
    var a = $(e.target);

    switch (e.button) {
        case 0:
            $(document).trigger('togglefullscreen');
            break;
        case 2:
            removeApplication(a.data('application'))
            break;
    }
});

$('body').live('mousedown', function(e){

});

$('#newDocument').live('click', function(){
    if (state.active !== null) {
        createDocument(state.active);
        $(window).trigger('resize'); // TODO: Optimize.
    }
});

$('#newApplication').live('click', function(){
    applicationGrid
        .css('left', 0)
        .css('top', $(this).offset().top - applicationGrid.height())
        .show();
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

$(document).bind('fullscreen', function(){
    for (var i = 0; i < applications.length; i++)
        applications[i].fullscreen();
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
