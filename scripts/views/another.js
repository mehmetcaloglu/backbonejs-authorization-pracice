define([
        'jquery',
        'underscore',
        'backbone',
        'text!../templates/another.html'
    ],
    function($, _, Backbone, AnotherTemplate) {

        var AnotherView = Backbone.View.extend({

            el: '.main-content',
            events: {

            },

            initialize: function () {
                console.log("Child view is being initialized...");
                this.render();
            },

            render: function () {
                var compiledTemplate = _.template(AnotherTemplate, {} );
                $(this.el).append(compiledTemplate);

            }

        });

        return AnotherView;


    });