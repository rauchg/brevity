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

var _instanceId = 0;

function createInstance(application) {
    var iframe = $(document.createElement('iframe'))
        .application(_instanceId, application, _instanceId);

    var overlay = $(document.createElement('div')).overlay(iframe, _instanceId);

    iframe.data('overlay', overlay);

    _instanceId++;

    return iframe;
};

$(function(){
    createInstance(applications[0][0]);
    createInstance(applications[0][1]);
    createInstance(applications[0][2]).trigger('activate');
});
