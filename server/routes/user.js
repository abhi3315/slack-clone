const router = require('express').Router()
const userAuth = require('../middleware/userAuth')
const userController = require('../controller/user')

router.post('/users', userController.create)
router.post('/users/login', userController.login)
router.post('/users/logout', userAuth, userController.logout)
router.post('/user/avatar', userAuth, userController.changeAvatar)

module.exports = router