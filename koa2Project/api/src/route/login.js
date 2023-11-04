const Router = require('koa-router');
const router = new Router({ prefix: '/login' });

// login页面
router.get('/', (ctx, next) => {
  return ctx.render('login');
});

module.exports = router;
