const express = require('express')
const userController = require('../controllers/user.controller')
const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).send('TODO: return user')
})

router.post('/register', userController.register)
router.post('/login', userController.login)

module.exports = router
