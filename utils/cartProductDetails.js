const {CartProduct, Product} = require("../models/models")

class CartProductDetails {
    static async getCart(userId) {
        const cartProducts = await CartProduct.findAll({
            where: {userId},
            raw: true
        })

        const productsFromCart = await this.getProductsFromCart(cartProducts)
        const totalPrice = await this.getTotalPrice(productsFromCart)
        const totalPriceWithShipping = await this.getTotalPriceWithShipping(totalPrice)

        return {
            productsFromCart,
            totalPrice,
            totalPriceWithShipping
        }
    }
    static async getProductsFromCart(cartProducts) {
        let productsFromCart = []
        let currentProduct
        for (const [i, cartProduct] of cartProducts.entries()) {
            currentProduct = await Product.findOne({
                where: {id: cartProduct.productId},
                raw: true
            })

            productsFromCart[i] = {
                quantity: cartProduct.quantity,
                total: cartProduct.quantity * currentProduct.price,
                ...currentProduct
            }
        }
        return productsFromCart
    }
    static async getTotalPrice(productsFromCart) {
        let totalPrice = 0
        productsFromCart.forEach(product => {
            totalPrice += product.total
        })
        return totalPrice
    }
    static async getTotalPriceWithShipping(totalPrice) {
        return totalPrice + 300
    }
}

module.exports = CartProductDetails