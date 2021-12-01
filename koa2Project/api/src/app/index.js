const Koa = require('koa')
const koaBody = require('koa-body')
const Router = require('../route')

const app = new Koa()

app.use(koaBody())
Router.forEach(route => {
    app.use(route.routes())
})

module.exports = app