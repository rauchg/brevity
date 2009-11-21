TestCase('ElementTest', {
    testActivate: function() {
        var Foo = Element.extend({
            init: function() {
                this.element = $(document.createElement('div'));
            }
        });

        var foo = new Foo();
        foo.activate();
        assertTrue(foo.get().hasClass('active'));
    }
});

