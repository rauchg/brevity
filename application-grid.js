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
        var that = this;
        this.element.click(function(e){
            that.deactivate();

            var application = that.brevity.createApplication(
                $(e.target).data('applicationDefinition'));

            that.brevity.createDocument(application);
            that.brevity.activateApplication(application);
            application.resize();
        });
    }
});

