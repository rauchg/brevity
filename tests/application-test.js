TestCase('ApplicationTest', {
    setUp: function(){
        this._brevity = new Brevity();

        this._application = new Application(
            this._brevity,
            { name: 'Search',
              url: 'http://www.google.com/' },
            1);
    },

    testAddDocument: function(){
        this._application.addDocument(new Document(new DocumentTab()));
    },

    testResize_Overlay: function(){
        var halfScreenWidth = (window.innerWidth / 2) + 'px';

        this._application.resize();
        assertTrue(this._application.getOverlay().css('width') === halfScreenWidth);

        // Overlay is not visible in fullscreen, and is not resized in
        // fullscreen either.

        this._brevity.fullscreen();
        this._application.resize();
        assertTrue(this._application.getOverlay().css('width') === halfScreenWidth);
    }
});
