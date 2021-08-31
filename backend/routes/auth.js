const router = require('express').Router()

const register = require('../controllers/auth/register')
const login = require('../controllers/auth/login')
const edit = require('../controllers/auth/edit')
const verify = require('../controllers/auth/verify')

router.post('/register', register)
router.post('/login', login)
router.post('/verify', verify)
router.patch('/edit', edit)

module.exports = router