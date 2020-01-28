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
  // if(Object.keys( .body).length!==4){
  //   res.json({
  //     code:1,
  //     msg:'wrong params'
  //   })
  //   return
  // }
  console.log("TCL: req.body", req.body)
  res.json(req.body)
  
})
module.exports = router
