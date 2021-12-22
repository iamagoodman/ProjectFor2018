const Router = require('koa-router')
const { register, login, modifyUser } = require('../controller/user.controller')
const { userValidDator, verifyUser, crpyPassword, verifyLogin } = require('../middleware/user.middleware')
const { userAuth } = require('../middleware/auth.middleware')
const router = new Router({ prefix: '/user' })

// 注册接口
router.post('/register',crpyPassword,  userValidDator, verifyUser, register)

// 登陆接口
router.post('/login', verifyLogin, login)

// 修改密码
router.post('/modify', userAuth, crpyPassword, modifyUser)

module.exports = router 