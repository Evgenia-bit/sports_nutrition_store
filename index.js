const path = require('path')
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const fileupload = require('express-fileupload')
const hbs = require("hbs")

const sequelize = require('./db/db')
const router = require('./routes/index')


require('dotenv').config()

const PORT = process.env.PORT || 5000

const app = express()

app.set("view engine", "hbs");
hbs.registerPartials(path.resolve(__dirname, './views/partials'))

app.use(express.static(path.resolve(__dirname, 'static')))

app.use(session({
    secret: 'dsfdf78HGy7',
    resave: true,
    saveUninitialized: true,
}))

app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }))

app.use(fileupload({}))

app.use('/', router)


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } 
    catch (e)
    {
        console.error(e)
    }
}

start()
