const express = require('express')
const router  = express.Router()

const test = require('./test')
const user = require('./user')
const listing = require('./listing')
const message = require('./message')
const auth = require('./auth')

router.use('/test', test)
router.use('/user', user)
router.use('/listing', listing)
router.use('/message', message)
router.use('/auth', auth)

module.exports = router
