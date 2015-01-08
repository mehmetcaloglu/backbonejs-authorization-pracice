define([
        'jquery',
        'underscore',
        'backbone',
        'views/home',
        'views/another'
    ],
    function($, _, Backbone, HomeView, AnotherView) {

        var AppRouter = Backbone.Router.extend({

            routes: {
                '':'home',
                'home' : 'home',
                'another':'another',
                '*actions': 'defaultAction'
            }

            /*
            loadView: function(view) {
                this.view && this.view.remove();
                console.log('No zombi views!! %O will be deleted. %O will be current view instead.', this.view, view);
                this.view = view;

            }
            */

        });

        var initialize = function () {

            var appRouter = new AppRouter();

            appRouter.on('route:home', function () {

                console.log("Router --> home");
                //this.loadView(new HomeView());
                new HomeView();

            });

            appRouter.on('route:another', function () {

                console.log("Router --> anotherRoute");
                //this.loadView(new AnotherView());
                new AnotherView();

            });

            // Start Backbone history a necessary step for bookmark-able URLs
            Backbone.history.start();
        };

        return {
            initialize: initialize
        };

});