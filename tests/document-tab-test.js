TestCase('DocumentTabTest', {
    setUp: function(){
        this._documentTab = new DocumentTab();
    },

    testDocumentTab: function() {
        var nav = $(document.createElement('nav'));

        this._documentTab.appendTo(nav);
        this._documentTab.activate();

        assertTrue(nav.children().length === 1);
        assertTrue(this._documentTab.get().hasClass('active') === true);
    },

    // Used in event delegation to get access to the object through the element.

    testObjectData: function() {
        assertTrue(this._documentTab === this._documentTab.get().data('documentTab'));
    }
});

