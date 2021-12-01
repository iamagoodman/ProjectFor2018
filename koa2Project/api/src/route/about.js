const Router = require('koa-router')
const { detail } = require('../controller/about.controller')

const router = new Router({ prefix: '/about' })

router.get('/detail', detail)

module.exports = router