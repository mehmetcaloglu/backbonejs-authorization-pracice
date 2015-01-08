define([
        'jquery',
        'underscore',
        'backbone',
        'text!../templates/home.html'
    ],
    function($, _, Backbone, HomeTemplate) {

        var HomeView = Backbone.View.extend({

            el: '.container',
            events: {

            },

            initialize: function () {
                console.log("Home page is being initialized...");
                this.render();
            },

            render: function () {
                var compiledTemplate = _.template(HomeTemplate, {} );
                this.$el.html(compiledTemplate);

            }

        });

        return HomeView;


    });