const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('default.art', {
    title: 'Nodejs Center Cloud Service',
    author: { name: 'Webszy', link: 'https://github.com/webszy/center-service' }
  })
})
// register a service
router.post('/service', async (req, res) => {
  if(Object.keys(req.body).length!==4){
    
  }
})
module.exports = router
