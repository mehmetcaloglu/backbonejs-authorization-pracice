define(['underscore', 'backbone'], function (_, Backbone) {
    var ProductModel = Backbone.Model.extend({
        urlRoot: 'http://localhost:3000/api/v1/products/',
        defaults: {
            id: '',
            title: '',
            imgCover: '',
            description: '',
            price: 0,
            priceAfterDiscount: 0,
            quantity: 0,
            ratingAvg: 0,
            ratingCount: 0
        }
    });
    return ProductModel;
});
