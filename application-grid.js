var ApplicationGrid = Element.extend({
    init: function(brevity, applicationDefinitions){
        this.brevity = brevity;
        this.applicationDefinitions = applicationDefinitions;
        
        this.element = $(document.createElement('table'))
            .attr('id', 'applicationGrid');

        this.initGrid();
        this.initEvents();
    },

    initGrid: function(){
        for (var i = 0; i < this.applicationDefinitions.length; i++) {
            var row = $(document.createElement('tr'));
            for (var j = 0; j < this.applicationDefinitions[i].length; j++) {
                $(document.createElement('td'))
                    .text(this.applicationDefinitions[i][j].name)
                    .data('applicationDefinition', this.applicationDefinitions[i][j])
                    .appendTo(row);
            }
            row.appendTo(this.element);
        }
    },

    initEvents: function(){
        var brevity = this.brevity;
        var element = this.element;
        this.element.click(function(e){
            element.removeClass('active');

            var application = brevity.createApplication(
                $(e.target).data('applicationDefinition'));

            brevity.createDocument(application);
            brevity.activateApplication(application);
            application.resize();
        });
    }
});

