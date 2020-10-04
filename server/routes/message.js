const router = require('express').Router()
const userAuth = require('../middleware/userAuth')
const messageController = require('../controller/message')

router.post('/messages', userAuth, messageController.createMessage)
router.get('/messages', userAuth, messageController.getAllMessage)

module.exports = router