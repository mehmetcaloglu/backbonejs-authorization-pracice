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

                // Koleksiyondaki her ürünü render ediyoruz
                this.collection.each(function (product) {
                    var productView = new ProductView({ model: product });
                    gridDiv.append(productView.render().el);
                }, this);

                this.$el.append(gridDiv);

                return this;
            }
        });

        return ProductsView;
    });
