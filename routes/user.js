const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')

router.post('/register',userController.register)
router.post('/login',userController.login)
router.get('/fetch-user',userController.fetchAllUsers)
router.delete('/delete',userController.deleteUser)
router.put('/edit',userController.updateUser)

module.exports = router