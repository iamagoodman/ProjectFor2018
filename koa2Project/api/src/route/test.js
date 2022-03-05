const Router = require('koa-router')
const { createData, queryData } = require('../controller/test.controller')
const router = new Router({ prefix: '/test' })

// 注册接口
router.post('/createData', createData)

// 登陆接口
router.get('/queryData', queryData)

module.exports = router 