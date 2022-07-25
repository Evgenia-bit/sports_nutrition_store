const bcrypt = require('bcryptjs');
const {User} = require('../models/models');

class UserController {
    auth(req, res) {
        return res.render('auth.hbs')
    }

    async registration(req, res) {
        const {email, password} = req.body
        if (!email || !password) {
            return res.status(400).json({status: "Error", msg: "Некорректные данные!"})
        }

        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return res.status(409).json({status: "Error", msg: "Пользователь с таким email существует!"});
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const createdUser = await User.create({email, password: hashPassword})
        req.session.user_id = createdUser.id;
        req.session.auth = true

        return res.json({status: "Success", redirect: '/'});
    }

    async login(req, res) {
        const {email, password} = req.body

        const foundUser = await User.findOne({where: {email}})
        if (!foundUser) {
            return res.status(404).json({status: "Error", msg: "Пользователь с таким email не найден!"});
        }

        let comparePassword = bcrypt.compareSync(password, foundUser.password)
        if (!comparePassword) {
            return res.json({status: "Error", msg: "Неверный пароль"});
        }

        req.session.user_id = foundUser.id;
        req.session.auth = true

        return res.json({status: "Success", redirect: '/'});
    }

    logout(req, res) {
        req.session.user_id = '';
        req.session.auth = null
        return res.redirect('/')
    }
}

module.exports = new UserController()