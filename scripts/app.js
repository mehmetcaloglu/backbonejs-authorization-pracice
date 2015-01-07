require(['config'], function () {
    require([], function() {
        console.log("Inside app.js. config loaded as dependency.");

    });
});