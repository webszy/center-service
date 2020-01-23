const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('default.art', { title: 'Nodejs Center Cloud Service' })
})

module.exports = router
