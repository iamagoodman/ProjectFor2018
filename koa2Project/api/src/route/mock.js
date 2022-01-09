const Router = require('koa-router')
const { save, getList, getItem, deleteItem } = require('../controller/mock.controller')
const { userAuth } = require('../middleware/auth.middleware')
const router = new Router({ prefix: '/mock' })

// 保存mock项目
router.post('/save',userAuth, save)

router.post('/delete',userAuth, deleteItem)

// 查询mock项目列表
router.get('/list', userAuth, getList)

// 根据id查询具体项目
router.get('/queryById', userAuth, getItem)

// 根据id查询具体项目
router.all('/test', save)

module.exports = router 