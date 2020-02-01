const createError = require('http-errors')
const express = require('express')
const path = require('path')
const fs = require('fs-extra')
const rfs = require('rotating-file-stream')
const cors = require('cors')
const hemlet = require('helmet')
const morgan = require('morgan')
const config = require('./config.json')
const app = express()

// global variables
const port = process.env.PORT || 3000
// const env = process.env.NODE_ENV

// set logs
const logFileName = (time, index) => {
  if (!time) return 'access.log'
  const pad = num => (num > 9 ? '' : '0') + num
  const month = time.getFullYear() + '' + pad(time.getMonth() + 1)
  const day = pad(time.getDate())
  const hour = pad(time.getHours())
  const minute = pad(time.getMinutes())
  return `access-${month}/${month}${day}-${hour}${minute}-${index}.log`
}
const logDirectory = path.join(__dirname, config.logDirectory)
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
const accessLogStream = rfs.createStream(logFileName, {
  interval: '1d', // rotate daily
  path: logDirectory
})

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
// set router
app.use('/', require('./routes/index'))
app.use('/service', require('./routes/serviceRegister'))
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
