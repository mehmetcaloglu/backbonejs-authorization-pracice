define(['underscore', 'backbone', 'models/product'], function (_, Backbone, ProductModel) {
    var ProductsCollection = Backbone.Collection.extend({
        model: ProductModel,
        url: 'http://localhost:3000/api/v1/products/',
        parse: function (response) {
            return response.getAllProducts
        }
    });
    return ProductsCollection;
});
    