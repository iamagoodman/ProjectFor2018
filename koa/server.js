const koa = require('koa');

const app = new koa();

app.use(async (ctx, next) => {
  ctx.body = 'Hello Word'
  await next();
});
app.listen(3000)


app.use(async function (ctx, next) {
  console.log('1');
  await next();
  console.log('2');
});

app.use(async function (ctx, next) {
  console.log('3');
  await next();
  console.log('4');
});

app.use(async function (ctx, next) {
  console.log('5');
});

