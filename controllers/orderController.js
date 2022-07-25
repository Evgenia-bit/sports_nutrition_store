const {CartProduct, Order} = require('../models/models');
const cartProductDetails = require("../utils/cartProductDetails");

class OrderController {
    async getOrderDetails(req, res) {
        const orderDetails = await cartProductDetails.getCart(req.session.user_id)

        return res.render('order.hbs', {
            ...orderDetails});
    }

    async createOrder(req, res) {
        const newOrder = await Order.create({...req.body}, {raw: true})
        return res.redirect(`/success${newOrder.id}`)
    }

    async success(req, res) {
        await CartProduct.destroy({
            where: {
                userId: req.session.user_id
            }
        })
        return res.render('success.hbs', {num: req.params.id, auth: req.session.auth});
    }
}

module.exports = new OrderController()