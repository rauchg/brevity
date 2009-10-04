DocumentTabTest = TestCase('DocumentTabTest');

DocumentTabTest.prototype.testDocumentTab = function() {
    var documentTab = new DocumentTab(new MockDocument());
    var nav = $(document.createElement('nav'));

    documentTab.appendTo(nav);
    documentTab.activate();

    assertTrue(nav.children().length === 1);
    assertTrue(documentTab.get().hasClass('active') === true);
};

// Used in event delegation to get access to the object through the element.

DocumentTabTest.prototype.testObjectData = function() {
    var documentTab = new DocumentTab(new MockDocument());
    assertTrue(documentTab === documentTab.get().data('documentTab'));
};
