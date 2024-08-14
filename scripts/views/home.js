define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/home.html'
], function ($, _, Backbone, HomeTemplate) {

    var HomeView = Backbone.View.extend({

        el: '.main-content',

        initialize: function () {
            this.render();
        },

        render: function () {
            var compiledTemplate = _.template(HomeTemplate, {});
            $(this.el).html(compiledTemplate);
        }

    });

    // 


    return HomeView;
});
