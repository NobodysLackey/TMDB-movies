const express = require('express')
const router = express.Router()
const moviesCtrl = require('../controllers/movies')

router.get('/', moviesCtrl.index)
router.get('/search', moviesCtrl.search)
router.get('/details/:id', moviesCtrl.details)

module.exports = router
