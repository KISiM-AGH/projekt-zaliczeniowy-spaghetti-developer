require('dotenv').config()
require('./app/db/db').connect()
const express = require('express')
const setRoutes = require('./app/routes/routes')
const app = express()

app.use(express.json())
setRoutes(app)

module.exports = app
