define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/register.html'
], function ($, _, Backbone, RegisterTemplate) {

    var RegisterView = Backbone.View.extend({

        el: '.main-content',
        events: {
            'submit #register-form': 'register'
        },

        initialize: function () {
            this.render();
        },

        render: function () {
            let script = document.createElement('script');
            script.src = 'scripts/main.js?t=' + new Date().getTime();
            document.head.appendChild(script);
            var compiledTemplate = _.template(RegisterTemplate, {});
            $(this.el).html(compiledTemplate);
        },

        register: function (e) {
            e.preventDefault();
            var email = $('#email').val();
            var name = $('#name').val();
            var password = $('#password').val();

            fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    name: name,
                    password: password,

                })
            })
                .then(data => {
                    alert('Registration successful! Please log in.');
                    Backbone.history.navigate('login', { trigger: true });
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert(error.message);
                });
            // $.ajax({
            //     url: 'http://localhost:3000/register',
            //     method: 'POST',
            //     contentType: 'application/json',
            //     data: {
            //         username: username, name: name, password: password, gender: gender, location: location
            //     },
            //     success: function () {
            //         alert('Registration successful! Please log in.');
            //         Backbone.history.navigate('login', { trigger: true });
            //     },
            //     error: function () {
            //         alert('Registration failed!');
            //     }
            // });
        }
    });

    return RegisterView;
});
