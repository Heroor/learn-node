const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check.js').checkLogin

// GET 登出
router.get('/', checkLogin, (req, res, next) => {
  req.session.user = null
  res.send('登出')
})

module.exports = router
