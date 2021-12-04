const Koa = require('koa')
const koaBody = require('koa-body')
const Router = require('../route')
const errHandle = require('./errHandle')
const app = new Koa()

app.use(koaBody())
Router.forEach(route => {
    app.use(route.routes())
})
app.on('error', errHandle)
module.exports = app