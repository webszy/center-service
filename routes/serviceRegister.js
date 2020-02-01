
const express = require('express')
const router = express.Router()

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
