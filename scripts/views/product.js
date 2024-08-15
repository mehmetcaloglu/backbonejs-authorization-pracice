define(['underscore', 'backbone', 'text!templates/productTemplate.html'],
    function (_, Backbone, productTemplate) {

        var ProductView = Backbone.View.extend({
            tagName: 'div',
            className: 'product-card',
            template: _.template(productTemplate),

            // listen add to cart button
            events: {
                'click .add-to-cart': 'addToCart'
            },

            render: function () {
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            },

            addToCart: async function () {
                // get cart items from local storage
                var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                // add product to cart items
                cartItems.push(this.model.toJSON());
                // save cart items to local storage
                localStorage.setItem('cartItems', JSON.stringify(cartItems));

                // post requst to backend /api/v1/carts/  , productId from body and token from header
                // make button disable when request is processing
                // enable button when request is done
                // show alert when request is failed

                // make button fucking disable

                const token = localStorage.getItem('token')
                console.log(token)
                var $button = this.$('.add-to-cart');

                $button.addClass('disabled')

                await fetch('http://localhost:3000/api/v1/carts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token
                    },
                    body: JSON.stringify({
                        productId: this.model.get('id')
                    })
                })
                    .then(response => {
                        if (response.ok) {
                            alert('Product added to cart successfully');
                        } else {
                            throw new Error('Product add to cart failed');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert(error.message);
                    });

                // enable button
                $button.removeClass('disabled')

            }

        });

        return ProductView;
    });
