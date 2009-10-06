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
    var brevity = new Brevity();

    $('#documentBar').documentBar(brevity);
    $('#applicationBar').applicationBar(brevity);
    //$('#search').wallSearch(this);

    var applicationGrid = new ApplicationGrid(brevity, applicationDefinitions);
    applicationGrid.appendTo('body');

    var context = document.getElementById('toggleFullscreenCanvas').getContext('2d');
    context.strokeStyle = 'rgba(255,255,255,0.625)';
    roundedRect(context, 2, 2, 18, 18, 6);

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
        brevity.toggleBars();
    });

    $(window).bind('resize', function(){
        brevity.resize();
    });

    $(window).trigger('resize');

    $('#wall').live('mousedown', function(e){
        if (applicationGrid.isActive() === true) {
            applicationGrid.deactivate();
            return;
        }

        var left = e.clientX - (applicationGrid.get().width() / 2);
        var top = e.clientY - (applicationGrid.get().height() / 2);

        applicationGrid.get()
            .css('left', $.range(left, left + applicationGrid.get().width(), 0,
                window.innerWidth))
            .css('top', $.range(top, top + applicationGrid.get().height(), 0,
                window.innerHeight))
            .addClass('active');
    });
});

