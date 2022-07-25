const {Sequelize} = require("sequelize")
const {CartProduct, Product} = require('../models/models')
const cartProductDetails = require('../utils/cartProductDetails')

class CartController {
    async addProductToCard(req, res, next) {
        const productId = req.params.id
        const userId = req.session.user_id

        const existingCartProduct = await CartProduct.findOne({
            where: {productId, userId}
        })

        if (existingCartProduct) {
            await CartProduct.update(
                {quantity: Sequelize.literal('quantity + 1')},
                {where: {productId, userId}})
        } else {
            await CartProduct.create({
                productId,
                userId
            })
        }

        return res.json({msg: "Товар успешно добавлен в корзину!"})
    }

    async getCart(req, res) {
        const cartDetails = await cartProductDetails.getCart(req.session.user_id)

        return res.render('cart.hbs', {
            auth: req.session.auth,
            ...cartDetails})
    }
    async updateTheCart(req, res) {
        const { productId, quantity } = req.query

        await CartProduct.update(
            {quantity},
            {where: {productId, userId: req.session.user_id}}
        )

        const { price } = await Product.findOne({
            where: {id: productId},
            raw: true
        })

        const newPrice = price * quantity;

        const newCartDetails = await cartProductDetails.getCart(req.session.user_id)

        return res.json({
            msg: "Обновлено!",
            auth: req.session.auth,
            newPrice,
            price,
            newTotalPrice: newCartDetails.totalPrice,
            newTotalPriceWithShipping: newCartDetails.totalPriceWithShipping
        })
    }

    async emptyCart(req, res, next) {
        await CartProduct.destroy({
            where: {
                userId: req.session.user_id
            }
        })

        return res.render('cart.hbs', {auth: req.session.auth, msg: "Корзина успешно очищена!"})
    }
}

module.exports = new CartController()