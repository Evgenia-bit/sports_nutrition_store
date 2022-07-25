const {Workout, Exercise} = require('../models/models');

class WorkoutController {
    async getAllWorkouts(req, res) {
        const workouts = await Workout.findAll({raw: true})
        return res.render('workout.hbs', {auth: req.session.auth, workouts});
    }

    async getOneWorkout(req, res) {
        const exercises = await Exercise.findAll({
            where: {workoutId: req.params.id},
            raw: true
        })
        return res.render('exercises.hbs', {auth: req.session.auth, exercises});
    }
}

module.exports = new WorkoutController()