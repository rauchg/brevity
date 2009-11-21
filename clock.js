(function($){

$.fn.clock = function() {
    return this.each(function(){
        var clock = $(this);

        function updateClock() {
            var now = new Date();

            clock.text(
                leadingZero(now.getHours()) + ':' +
                leadingZero(now.getMinutes()));

            window.setTimeout(function() {
                updateClock();
            }, 1000);
        }

        function leadingZero(n) {
            if (n < 10)
                return '0' + n;
            else
                return n;
        }

        updateClock();
    });
};

})(jQuery);

