
module.exports = {
  post: async (req, res) => {
    console.log("TCL: req.body", req.body)
    res.json(req.body)
  }
}
