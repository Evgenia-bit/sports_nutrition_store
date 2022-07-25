const {Product, Category} = require('../models/models')

class ProductController {
    async getHome(req, res) {
        const products = await Product.findAll({
                raw: true,
                limit: 12
            })
        return res.render('home.hbs', {auth: req.session.auth, products})
    }

    async getCategories(req, res) {
        const categories = await Category.findAll({
                raw: true
            })
        return res.render('categories.hbs', {auth: req.session.auth, categories})
    }

    async getCatalog(req, res) {
        const products = await Product.findAll({
            where: {categoryId: req.params.id},
            raw: true
        })
        const categoryName = await Category.findOne({
            where: {id: req.params.id},
            raw: true
        })
        return res.render('catalog.hbs', {auth: req.session.auth, products, categoryName: categoryName.name})
    }

    async getOneProduct(req, res) {
        const product = await Product.findOne({
                where: {id: req.params.id}
            })
        const category = await Category.findOne({
                where: {id: product.categoryId}
            })
        return res.render('product.hbs', {auth: req.session.auth, product, catName: category.name})
    }
}

module.exports = new ProductController()