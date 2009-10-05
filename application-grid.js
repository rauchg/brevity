(function($){

$.fn.applicationGrid = function(brevity, applicationDefinitions) {
    return this.each(function(){
        var applicationGrid = $(this);

        for (var i = 0; i < applicationDefinitions.length; i++) {
            var row = $(document.createElement('tr'));
            for (var j = 0; j < applicationDefinitions[i].length; j++) {
                $(document.createElement('td'))
                    .text(applicationDefinitions[i][j].name)
                    .data('appDefinition', applicationDefinitions[i][j])
                    .appendTo(row);
            }
            row.appendTo(applicationGrid);
        }

        applicationGrid.click(function(e){
            applicationGrid.removeClass('active');
            var appDefinition = $(e.target).data('appDefinition'),
            application = brevity.createApplication(appDefinition);
            brevity.createDocument(application);
            brevity.activateApplication(application);
            application.resize();
        });

        $('#wall').live('mousedown', function(e){
            if (applicationGrid.hasClass('active') === true)
                applicationGrid.removeClass('active');
            else {
                var left = e.clientX - (applicationGrid.width() / 2);
                var top = e.clientY - (applicationGrid.height() / 2);

                applicationGrid
                    .css('left', $.range(left, left + applicationGrid.width(), 0,
                        window.innerWidth))
                    .css('top', $.range(top, top + applicationGrid.height(), 0,
                        window.innerHeight))
                    .addClass('active');
            }
        });
    });
};

})(jQuery);
