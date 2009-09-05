(function($){
$.fn.applicationBar = function() {
    return this.each(function(){
        var applicationBar = $(this).bar('bottom');

        $('iframe').live('appcreated', function(){
            var iframe = $(this);

            var a = $(document.createElement('a'))
                .text('Hai')
                .appendTo('#applicationList')
                .data('iframe', iframe);

            iframe.data('a', a);
        });

        $('#applicationList').bind('click', function(e){
            $(e.target).data('iframe').trigger('togglefullscreen');
        });

        $('#applicationList').bind('mouseover', function(e){
            if ($('iframe.active').hasClass('fullscreen') === true)
            {
                // TODO: Implement fullscreen behavior.
            }
            else
                $('body').trigger('appactivate', $(e.target).data('iframe'));
        });
    });
};
})(jQuery);
