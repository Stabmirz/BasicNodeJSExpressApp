var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
  res.render('index')
})
// define the about route
router.get('/about', function (req, res) {
  res.render('about')
})
router.get('/contact', function (req, res) {
  res.render('ContactUs')
})


module.exports = router