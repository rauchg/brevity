var Brevity = Class.extend({
    init: function(){
        this.applications = [];
        this.activeApplication = null;
    },

    resize: function() {
        $('div#wall')
            .css('left', 0)
            .css('top', 0)
            .css('width', window.innerWidth)
            .css('height', window.innerHeight);

        for (var i = 0; i < this.applications.length; i++)
            this.applications[i].resize();
    },

    createApplication: function(applicationDefinition) {
        var application = new Application(
            this,
            applicationDefinition,
            this.applications.length);

        application.getOverlay().appendTo('body');
        application.getApplicationTab().appendTo('nav#applicationList');
        application.getDocumentList().appendTo('div#documentBar');

        this.applications.push(application);

        return application;
    },

    activateApplication: function(application) {
        this.applications.sort(function(a, b){
            return a.getZIndex() - b.getZIndex();
        });

        var zIndex = 0;

        for (var i = 0; i < this.applications.length; i++) {
            if (this.applications[i] !== application)
                this.applications[i].deactivate(zIndex++);
        }

        application.activate(zIndex);

        this.activeApplication = application;
    },

    getActiveApplication: function() {
        return this.activeApplication;
    },

    createDocument: function(application) {
        var document_ = new Document(new DocumentTab());
        document_.appendTo('body');
        application.addDocument(document_);
        application.activateDocument(document_);
    },

    removeApplication: function(application) {
        for (var i = 0; i < this.applications.length; i++) {
            if (this.applications[i] === application) {
                this.applications.remove(i);
                break;
            }
        }
        application.remove();
        if ((this.applications.length === 0) && $('body').hasClass('fullscreen'))
            this.wall();
        else {
            if (application === this.activeApplication)
                this.activateApplication(this.applications[this.applications.length - 1]);
        }
    },

    fullscreen: function() {
        $('body').addClass('fullscreen');
        this.resizeApplications();
    },

    isFullscreen: function() {
        return $('body').hasClass('fullscreen');
    },

    wall: function() {
        $('body').removeClass('fullscreen');
        this.resizeApplications();
    },

    toggleFullscreen: function(){
        $('body').toggleClass('fullscreen');
        this.resizeApplications();
    },

    resizeApplications: function(){
        for (var i = 0; i < this.applications.length; i++)
            this.applications[i].resize();
    },

    toggleBars: function(){
        $('.bar').trigger('toggle');

        for (var i = 0; i < this.applications.length; i++)
            this.applications[i].toggleBars();
    }
});
