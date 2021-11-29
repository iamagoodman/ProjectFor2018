var router = require('koa-router')();

router.prefix('/users');

router.get('/', function *(next) {
  const res = {
    message: '',
    success: true,
    codeDesc: 200,
    data: [{ name: 'frank', sex: 'M', age: 18 }],
    page: 1,
    size: 10,
    total: 1
  }
  this.body = JSON.stringify(res);
});

router.get('/bar', function *(next) {
  this.body = 'this is a users/bar response!';
});
router.get('/fuck', function *(ctx) {
  console.log('ctx', ctx);
  console.log(ctx.request);
  this.body = 'this is a users/bar response!';
});
router.post('/post', function *(next) {
  const res = {
    message: '',
    success: true,
    codeDesc: 200,
    data: [{ name: 'frank', sex: 'M', age: 18 }],
    page: 1,
    size: 10,
    total: 1
  }
  this.body = res;
});
module.exports = router;
