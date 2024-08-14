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
            var email = $('#email').val();
            var password = $('#password').val();

            // Backend ile login işlemi yapılır ve token alınır
            fetch('http://localhost:3000/api/v1/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem('token', data.token);
                    Backbone.history.navigate('home', { trigger: true });
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Login failed!');
                });
            // $.ajax({
            //     url: 'http://localhost:3000/api/v1/auth/signin',
            //     method: 'POST',
            //     data: { username: username, password: password },
            //     success: function (response) {
            //         localStorage.setItem('token', response.token);
            //         Backbone.history.navigate('home', { trigger: true });
            //     },
            //     error: function () {
            //         alert('Login failed!');
            //     }
            // });
        }
    });

    return LoginView;
});
