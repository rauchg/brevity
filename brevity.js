var applications = [
[
    {
        name: 'Search',
        url: 'http://www.google.com/'
    },
    {
        name: 'Music',
        url: 'http://www.google.com/'
    },
    {
        name: 'Photo',
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

function createApplication(application) {
    return $(document.createElement('iframe')).application(application);
};

$(function(){
    var wall = $('body').wall();

    $('#documentBar').bar('top');
    $('#applicationBar').applicationBar();

    createApplication(applications[0][0]);
    createApplication(applications[0][1]);
    var iframe = createApplication(applications[0][2]);

    wall.trigger('appactivate', iframe);

    $(window).trigger('resize');
});

$(document).bind('keydown', 'ctrl+shift+space', function(){
    $('iframe.active').trigger('togglefullscreen');
});

$(document).bind('keydown', 'alt+f', function(){
    $('.bar').trigger('togglevisibility');
});
