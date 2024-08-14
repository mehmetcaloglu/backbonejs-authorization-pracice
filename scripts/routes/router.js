define([
    'jquery',
    'underscore',
    'backbone',
    'views/home',
    'views/another',
    'views/login',
    'views/register',
    'views/products',
    'views/productDetails',  // Ürün detay view'i ekliyoruz
    'models/product',
    'collections/products', // Koleksiyonun doğru yolu burada olmalı
], function ($, _, Backbone, HomeView, AnotherView, LoginView, RegisterView, ProductListView, ProductDetailView, Product, ProductCollection) {

    var AppRouter = Backbone.Router.extend({

        routes: {
            '': 'checkAuth',         // Boş route için checkAuth fonksiyonu kullanılır
            'home': 'goToProducts',  // home route'u için goToProducts fonksiyonu kullanılır
            'another': 'another',
            'login': 'login',
            'register': 'register',
            'products': 'showProducts',
            'product/:id': 'showProductDetail',  // Ürün detay sayfası için route
            '*actions': 'defaultAction',
        },

        // Token olup olmadığını kontrol eden fonksiyon
        requireAuth: function (callback) {
            var token = localStorage.getItem('token');

            if (token == "undefined" || token === undefined || token.trim() === "") {
                console.log('Token not found');
                Backbone.history.navigate('login', { trigger: true });
            } else {
                console.log('Token found: ' + token);
                callback();
            }
        },

        checkAuth: function () {
            var token = localStorage.getItem('token');
            console.log(token);
            if (token == "undefined" && token == null) {
                this.navigate('login', { trigger: true });
            } else {
                this.navigate('products', { trigger: true }); // Doğru route ismi 'products'
            }
        },

        goToProducts: function () {
            this.requireAuth(function () {
                // navigate /products 
                Backbone.history.navigate('products', { trigger: true });
            });
        },

        home: function () {
            this.requireAuth(function () {
                showProducts();
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
            Backbone.history.navigate('products', { trigger: true });
        },

        showProducts: function () {
            var products = new ProductCollection(); // Koleksiyonun örneğini oluşturuyoruz
            products.fetch({
                success: function (collection, response, options) {

                    console.log("Data fetched successfully: ", response);

                    var productsListView = new ProductListView({ collection: products });

                    productsListView.render();
                },
                error: function (collection, response, options) {

                    console.error("Failed to fetch data: ", response);


                }
            });
        },

        showProductDetail: function (id) {
            var product = new Product({ id: id });
            product.fetch({
                success: function () {
                    var productDetailView = new ProductDetailView({ model: product });
                    productDetailView.render();
                },
                error: function () {
                    console.log('Failed to fetch product details.');
                }
            });
        }

    });

    var initialize = function () {
        var appRouter = new AppRouter();
        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});
