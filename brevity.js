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

var applications = [],
activeApplication = null,

documentBar,
newDocument,

applicationBar,
newApplication,
applicationList,

applicationGrid;

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
    newDocument = $('#newDocument');

    applicationBar = $('#applicationBar').bar('bottom');
    newApplication = $('#newApplication');
    applicationList = $('#applicationList');

    applicationGrid = $('#applicationGrid');

    setupApplicationGrid();

    $(window).trigger('resize');
});

function createApplication(appDefinition) {
    var application = new Application(
        appDefinition,
        applications.length);

    applications.push(application);

    application.getDocumentList().appendTo(documentBar);
    application.getApplicationTab().prependTo(applicationList);

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
    application.addDocument(new Document(application.getUrl()));
}

function activateApplication(application) {
    applications.sort(function(a, b){
        return a.getZIndex() - b.getZIndex();
    });

    var zIndex = 0;

    for (var i = 0; i < applications.length; i++) {
        if (applications[i] !== application)
            applications[i].deactivate(zIndex++);
    }

    application.activate(zIndex);

    activeApplication = application;
}

$('#newDocument').live('mousedown', function(){
    if (activeApplication !== null) {
        createDocument(activeApplication);
        $(window).trigger('resize'); // TODO: Optimize.
    }
});

$('#toggleFullscreen').live('mousedown', function(){
    $(document).trigger('togglefullscreen');   
});

$('#applicationList').live('mouseover', function(e){
    activateApplication($(e.target).data('application'));
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

$('#newApplication').live('mousedown', function(){
    if (applicationGrid.css('display') !== 'none')
        applicationGrid.hide();
    else
        applicationGrid
            .css('left', 0)
            .css('top', $(this).offset().top - applicationGrid.height())
            .show();
});

function setupApplicationGrid() {
    for (var i = 0; i < appDefinitions.length; i++) {
        var row = $.create('tr');
        for (var j = 0; j < appDefinitions[i].length; j++) {
            $.create('td')
                .text(appDefinitions[i][j].name)
                .data('appDefinition', appDefinitions[i][j])
                .appendTo(row);
        }
        row.appendTo(applicationGrid);
    }
}

$('#applicationGrid').live('mousedown', function(e){
    var appDefinition = $(e.target).data('appDefinition'),
    application = createApplication(appDefinition);
    createDocument(application);
    activateApplication(application);
    $(document).trigger('fullscreen');
    applicationGrid.fadeOut();
});

$('#wall').live('mousedown', function(e){
    if (applicationGrid.css('display') !== 'none')
        applicationGrid.hide();
    else {
        var left = e.clientX - (applicationGrid.width() / 2);
        var top = e.clientY - (applicationGrid.height() / 2);

        applicationGrid
            .css('left', $.range(left, left + applicationGrid.width(), 0,
                window.innerWidth))
            .css('top', $.range(top, top + applicationGrid.height(), 0,
                window.innerHeight))
            .show();
    }
});

$(document).bind('activateapplication', function(e, application){
    activateApplication(application);
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

$(document).bind('togglebars', function(){
    $('.bar').trigger('toggle');

    for (var i = 0; i < applications.length; i++)
        applications[i].toggleBars();
});

$(document).bind('keydown', 'ctrl+space', function(){
    $(document).trigger('togglefullscreen');
});

$(document).bind('keydown', 'space', function(){
    $(document).trigger('fullscreen');
});

$(document).bind('keydown', 'alt+f', function(){
    $(document).trigger('togglebars');
});

$(document).bind('keydown', function(e){
});

$(window).bind('contextmenu', function(){
    return false;
});

$(window).resize(function(){
    var rect = {};
    rect.left = 0;
    rect.top = 0;
    rect.width = window.innerWidth;
    rect.height = window.innerHeight;
    $('#wall').rectangle(rect);
    for (var i = 0; i < applications.length; i++)
        applications[i].resize();
});
