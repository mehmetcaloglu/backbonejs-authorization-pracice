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
            var compiledTemplate = _.template(RegisterTemplate, {});
            $(this.el).html(compiledTemplate);
        },

        register: function (e) {
            e.preventDefault();
            var username = $('#username').val();
            var email = $('#email').val();
            var password = $('#password').val();
            var role = $('#role').val();

            // Backend ile register işlemi yapılır
            $.ajax({
                url: 'http://localhost:3000/auth/register',
                method: 'POST',
                data: { username: username, email: email, password: password, role: role },
                success: function () {
                    alert('Registration successful! Please log in.');
                    Backbone.history.navigate('login', { trigger: true });
                },
                error: function () {
                    alert('Registration failed!');
                }
            });
        }
    });

    return RegisterView;
});
