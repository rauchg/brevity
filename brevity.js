var applications = [
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

var _instanceId = 0;

function createInstance(application) {
    var z = $('iframe').length;

    var iframe = $(document.createElement('iframe'))
        .application(_instanceId++, application, z);

    var overlay = $(document.createElement('div')).overlay(iframe, z);

    iframe.data('overlay', overlay);

    return iframe;
};

$(function(){
    createInstance(applications[0][0]);
    createInstance(applications[0][1]);
    createInstance(applications[0][2]).trigger('activate');
});
