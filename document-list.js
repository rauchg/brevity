(function($){

$.fn.documentList = function(application) {
    return this.each(function(){
        $(this)
            .addClass('documentList')
            .bind('mouseover', function(e){
                var item = $(e.target);
                if (item.is('a'))
                    application.activateDocument(item.data('document'));
            })
            .bind('mousedown', function(e){
                var item = $(e.target);

                if (item.is('span'))
                    item = item.parent();

                switch (e.button) {
                case 0:
                    item.data('span').hide();
                    item.data('input')
                        .attr('value', 'http://www.')
                        .show()
                        .focus();

                    break;
                case 2:
                    application.removeDocument(item.data('document'));
                    break;
                }

                e.preventDefault();
            });
    });
};

})(jQuery);
