var Brevity = Class.extend({
    init: function(wall, documentBar, applicationBar){
        this.wall = wall;
        this.documentBar = documentBar;
        this.applicationBar = applicationBar;

        this.applications = [];
        this.activeApplication = null;
    },

    resize: function() {
        for (var i = 0; i < this.applications.length; i++)
            this.applications[i].resize();
    },

    createApplication: function(applicationDefinition) {
        var application = new Application(
            this,
            applicationDefinition,
            this.applications.length);

        application.getOverlay().appendTo('body');
        application.getApplicationTab().appendTo(
            this.applicationBar.getApplicationList());
        application.getDocumentList().appendTo(this.documentBar.get());

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
                this.activateApplication(
                    this.applications[this.applications.length - 1]);
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
        if (this.isFullscreen() === true) {
            for (var i = 0; i < this.applications.length; i++)
                this.applications[i].resize();
        }
    },

    areBarsHidden: function(){
        return !($('div.bar').hasClass('active'));
    }
});
