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

function createInstance(application) {
    return $(document.createElement('iframe')).application(application);
};

$(function(){
    createInstance(applications[0][0]);
    createInstance(applications[0][1]);
    createInstance(applications[0][2]).trigger('activate');
});

$(document).bind('keydown', 'ctrl+shift+space', function(){
    var active = $('iframe.application.active');

    if (active.hasClass('fullscreen') === true)
        active.trigger('wall');
    else
        active.trigger('fullscreen');
});

