define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/login.html'
], function ($, _, Backbone, LoginTemplate) {

    var LoginView = Backbone.View.extend({

        el: '.main-content',
        events: {
            'submit #login-form': 'authenticate',
            // register button click event
            'click #register': function () {
                Backbone.history.navigate('register', { trigger: true });
            }
        },

        initialize: function () {
            this.render();
        },

        render: function () {
            var compiledTemplate = _.template(LoginTemplate, {});
            $(this.el).html(compiledTemplate);
        },

        authenticate: function (e) {
            e.preventDefault();
            var username = $('#username').val();
            var password = $('#password').val();

            // Backend ile login işlemi yapılır ve token alınır
            $.ajax({
                url: 'http://localhost:3000/auth/login',
                method: 'POST',
                data: { username: username, password: password },
                success: function (response) {
                    localStorage.setItem('token', response.token);
                    Backbone.history.navigate('home', { trigger: true });
                },
                error: function () {
                    alert('Login failed!');
                }
            });
        }
    });

    return LoginView;
});
