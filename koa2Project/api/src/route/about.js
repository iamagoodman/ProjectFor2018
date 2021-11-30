const Router = require('koa-router')

const router = new Router({ prefix: '/about' })

router.get('/', (ctx, next) => {
    ctx.body = 'about page'
})

module.exports = router