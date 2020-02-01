const createError = require('http-errors')
const express = require('express')
const path = require('path')
const fs = require('fs-extra')
const cors = require('cors')
const hemlet = require('helmet')
const morgan = require('morgan')
const config = require('./config.json')
const app = express()

// global variables
const port = process.env.PORT || 3000
// const env = process.env.NODE_ENV

// set logs

const logDirectory = path.join(__dirname, config.logDirectory)
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'access.log'), { flags: 'a' })

// express midware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(hemlet())
app.use(morgan(config.logFormat, { stream: accessLogStream }))
// set view engine:art
app.engine('art', require('express-art-template'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'art')
// set static
app.use(express.static(path.join(__dirname, 'public')))
// import controllers (router handler function)
const IndexController = require('./controller/home')
const RegisterController = require('./controller/serviceRegister')
// set router
app.get('/',IndexController.get)
app.post('/service',RegisterController.post)
// catch 404
app.use((req, res, next) => {
  next(createError(404))
})
// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).render('error.art', { status: status })
})
// running app
app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})
