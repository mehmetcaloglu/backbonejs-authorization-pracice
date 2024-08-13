define([
    'jquery',
    'underscore',
    'backbone',
    'views/home',
    'views/another',
    'views/login',
    'views/register'
], function ($, _, Backbone, HomeView, AnotherView, LoginView, RegisterView) {

    var AppRouter = Backbone.Router.extend({

        routes: {
            '': 'home',
            'home': 'home',
            'another': 'another',
            'login': 'login',
            'register': 'register',
            '*actions': 'defaultAction'
        },

        requireAuth: function (callback) {
            var token = localStorage.getItem('token');
            if (!token) {
                Backbone.history.navigate('login', { trigger: true });
            } else {
                callback();
            }
        },

        home: function () {
            this.requireAuth(function () {
                new HomeView();
            });
        },

        another: function () {
            this.requireAuth(function () {
                new AnotherView();
            });
        },

        login: function () {
            new LoginView();
        },

        register: function () {
            new RegisterView();
        },

        defaultAction: function () {
            Backbone.history.navigate('home', { trigger: true });
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