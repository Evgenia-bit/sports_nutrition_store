const {DataTypes} = require('sequelize')
const sequelize = require('../db/db')


const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING}
})

const CartProduct = sequelize.define('cart', {
    quantity: {type: DataTypes.INTEGER, defaultValue: 1},
})

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false}
})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    img: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    buyerName: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: false},
    address: {type: DataTypes.STRING, allowNull: false},
})

const Calories = sequelize.define('calories', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    norm_in_day: {type: DataTypes.INTEGER, defaultValue: 0},
    eaten_today: {type: DataTypes.INTEGER, defaultValue: 0}
})

const Dish = sequelize.define('dish', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    calories: {type: DataTypes.INTEGER, allowNull: false},

})
const Workout = sequelize.define('workout', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Exercise = sequelize.define('exercise', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING},
})

User.hasMany(CartProduct)
CartProduct.belongsTo(User)

Category.hasMany(Product)
Product.belongsTo(Category)

Product.hasOne(CartProduct)
CartProduct.belongsTo(Product)

User.hasMany(Order)
Order.belongsTo(User)

User.hasOne(Calories)
Calories.belongsTo(User)

User.hasMany(Dish)
Dish.belongsTo(User)

Workout.hasMany(Exercise)
Exercise.belongsTo(Workout)


module.exports = {
    User,
    CartProduct,
    Product,
    Category,
    Order,
    Calories,
    Dish,
    Workout,
    Exercise
}