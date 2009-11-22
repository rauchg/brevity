TestCase('ApplicationTest', {
    setUp: function() {
        this.brevity = new Brevity();

        this.application = new Application(
            this.brevity,
            { name: 'Search',
              url: 'http://www.google.com/' },
            1);
    },

    testAddDocument: function() {
        this.application.addDocument(new Document(new DocumentTab()));
    },

    testResize_Overlay: function() {
        var halfScreenWidth = (window.innerWidth / 2) + 'px';

        this.application.resize();
        assertTrue(this.application.getOverlay().css('width') === halfScreenWidth);

        // Overlay is not visible in fullscreen, and is not resized in
        // fullscreen either.

        this.brevity.fullscreen();
        this.application.resize();
        assertTrue(this.application.getOverlay().css('width') === halfScreenWidth);
    }
});

