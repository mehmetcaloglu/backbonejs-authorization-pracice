define(['underscore', 'backbone', 'text!templates/productTemplate.html'],
    function (_, Backbone, productTemplate) {

        var ProductView = Backbone.View.extend({
            tagName: 'div',
            className: 'product-card',
            template: _.template(productTemplate),

            render: function () {
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            }
        });

        return ProductView;
    });
