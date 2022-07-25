const sequelize = require('sequelize')
const {Calories, Dish} = require('../models/models')

class CalorieController {
    async getCaloriesDetails(req, res) {
        let userCaloriesDetails = {
            normInDay: "Не рассчитано", eaten: 0, remains: 0, dishes: null
        }

        const userCalories = await Calories.findOne({
            where: {
                userId: req.session.user_id
            }, raw: true
        })

        if (!userCalories) {
            await Calories.create({
                userId: req.session.user_id
            }, {raw: true})
        } else {
            userCaloriesDetails.normInDay = userCalories.norm_in_day;
            userCaloriesDetails.eaten = userCalories.eaten_today;
            userCaloriesDetails.remains = userCaloriesDetails.normInDay - userCalories.eaten_today;
            userCaloriesDetails.dishes = await Dish.findAll({
                where: {
                    userId: req.session.user_id
                }, raw: true
            })
        }

        return res.render('calorie.hbs', {
            auth: req.session.auth, ...userCaloriesDetails
        })
    }

    async setNormCalories(req, res) {
        const normInDay = req.body.norm;

        const updatedCalories = await Calories.update({norm_in_day: normInDay}, {
            where: {userId: req.session.user_id}, returning: true, plain: true
        })

        const newCaloriesDetails = updatedCalories[1].dataValues
        const eaten = newCaloriesDetails.eaten_today;
        const remains = normInDay - eaten;

        return res.json({msg: "Норма калорий успешно установлена", norm: normInDay, eaten, remains});
    }

    async addDish(req, res) {
        const {name, calories} = req.body

        const updatedCalories =  await Calories.update({
            eaten_today: sequelize.literal(`eaten_today + ${calories}`)
        }, {
            where: {userId: req.session.user_id}, returning: true, plain: true
        })

        const newCaloriesDetails = updatedCalories[1].dataValues
        const remains = newCaloriesDetails.norm_in_day - newCaloriesDetails.eaten_today;

        const newDish = await Dish.create({userId: req.session.user_id, name, calories}, {raw: true})

        return res.json({
            msg: "Блюдо успешно добавлено",
            eaten: newCaloriesDetails.eaten_today,
            remains,
            name: newDish.name,
            calories: newDish.calories
        });
    }

    async removeDish(req, res) {
        await Dish.destroy({where: {userId: req.session.user_id}})
        await Calories.update({eaten_today: 0}, {
            where: {
                userId: req.session.user_id
            }
        })
        return res.redirect('/calorie');
    }
}

module.exports = new CalorieController()