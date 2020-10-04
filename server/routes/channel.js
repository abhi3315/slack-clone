const router = require('express').Router()
const userAuth = require('../middleware/userAuth')
const channelController = require('../controller/channel')

router.post('/channels', userAuth, channelController.createChannel)
router.get('/channels', userAuth, channelController.getAllChannel)

module.exports = router