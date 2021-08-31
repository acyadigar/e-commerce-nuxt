const router = require('express').Router()

const allUsers = require('../controllers/user/all-users')
const allUsersJson = require('../controllers/user/all-users-json')
const findUser = require('../controllers/user/find-user')
const addUser = require('../controllers/user/add-user')
const deleteUser = require('../controllers/user/delete-user')

router.get('/all', allUsers)
router.get('/all/json', allUsersJson)
router.get('/:id', findUser)
router.post('/', addUser)
router.delete('/:id', deleteUser)

module.exports = router