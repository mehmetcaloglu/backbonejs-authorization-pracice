define(['underscore', 'backbone', 'collections/products', 'views/product'],
    function (_, Backbone, ProductsCollection, ProductView) {

        var ProductsView = Backbone.View.extend({
            el: '.main-content',

            initialize: function () {
                // Doğru collection'u kullanarak oluşturuyoruz
                this.collection = new ProductsCollection();

                // Fetch sırasında `reset` event'ini dinliyoruz
                this.listenTo(this.collection, 'reset', this.render);

                // Koleksiyondaki ürünleri sunucudan alıyoruz
                this.collection.fetch({ reset: true });
            },

            render: function () {
                // Mevcut içeriği temizliyoruz
                this.$el.empty();

                var gridDiv = $('<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"></div>');
                var seeCarts = $('<a href="#carts" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded fixed top-0 right-0 m-4">See Carts</a>');
                gridDiv.append(seeCarts);
                // Koleksiyondaki her ürünü render ediyoruz
                this.collection.each(function (product) {
                    var productView = new ProductView({ model: product });
                    gridDiv.append(productView.render().el);
                });

                this.$el.append(gridDiv);
            }
        });

        return ProductsView;
    });
