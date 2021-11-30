const Koa = require('koa')

const Router = require('../route')

const app = new Koa()

Router.forEach(route => {
    app.use(route.routes())
})

module.exports = app