(function($){

$.fn.documentList = function(application) {
    return this.each(function(){
        $(this)
            .addClass('documentList')
            .bind('mouseup', function(e){
                var element = $(e.target);

                if (element.is('input') === true)
                    return;

                var documentTab = element.data('documentTab');
                var document_ = documentTab.getDocument();

                switch (e.button) {
                case 0:
                    if (application.getActiveDocument() === document_)
                        documentTab.showInput();
                    else
                        application.activateDocument(document_);
                    break;
                case 2:
                    application.removeDocument(document_);
                    break;
                }
            })
            .bind('keypress', function(e){
                var element = $(e.target);

                if (element.is('input') === false)
                    return;

                if (e.keyCode === 13) {
                    var documentTab = element.data('documentTab');
                    var document_ = documentTab.getDocument();

                    documentTab.showTitle();
                    document_.setUrl(documentTab.getUrl());
                }
            });
    });
};

})(jQuery);

