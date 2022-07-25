const Router = require('express')

const productController = require('../controllers/productController')
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const orderController = require('../controllers/orderController')
const calorieController = require('../controllers/calorieController')
const cartController = require('../controllers/cartController')
const workoutController = require('../controllers/workoutController')

const router = new Router

router.get('/', productController.getHome)
router.get('/categories', productController.getCategories)
router.get('/catalog:id', productController.getCatalog)
router.get('/product:id', productController.getOneProduct)

router.get('/auth', userController.auth)
router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/logout',authMiddleware, userController.logout)

router.get('/add_to_cart:id', authMiddleware, cartController.addProductToCard)
router.get('/cart', authMiddleware, cartController.getCart)
router.get('/update_the_cart', authMiddleware, cartController.updateTheCart)
router.get('/empty_the_cart', authMiddleware, cartController.emptyCart)

router.get('/order', authMiddleware, orderController.getOrderDetails)
router.post('/create_order', authMiddleware,  orderController.createOrder)
router.get('/success:id', authMiddleware, orderController.success)

router.get('/calorie', authMiddleware, calorieController.getCaloriesDetails)
router.post('/set_norm', authMiddleware, calorieController.setNormCalories)
router.post('/add_dish', authMiddleware, calorieController.addDish)
router.get('/remove_dish', authMiddleware, calorieController.removeDish)

router.get('/workout', workoutController.getAllWorkouts)
router.get('/workout:id', workoutController.getOneWorkout)

module.exports = router