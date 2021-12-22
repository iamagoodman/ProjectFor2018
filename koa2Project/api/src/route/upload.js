const Router = require('koa-router')
const router = new Router({ prefix: '/upload' })

// 上传接口
router.post('/face-img', (ctx, next) => {
  ctx.body = 'upload'
})

module.exports = router