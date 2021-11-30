const Router = require('koa-router')

const router = new Router({ prefix: '/user' })

router.get('/', (ctx, next) => {
    ctx.body = 'user page'
})

module.exports = router