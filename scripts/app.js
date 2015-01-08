define([
        'jquery',
        'underscore',
        'backbone',
        'routes/router'
    ],
    function($, _, Backbone, Router) {

        var initialize = function () {

            Router.initialize();
        };

        return {
            initialize: initialize
        }


});