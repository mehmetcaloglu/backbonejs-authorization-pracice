define(['underscore', 'backbone', 'text!templates/productDetailTemplate.html'],
    function (_, Backbone, productDetailsTemplate) {

        var ProductDetailsView = Backbone.View.extend({
            el: '.main-content',
            template: _.template(productDetailsTemplate),

            render: function () {
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            }
        });

        return ProductDetailsView;
    });
