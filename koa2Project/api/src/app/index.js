const Koa = require('koa')
const koaBody = require('koa-body')
const cors = require('koa2-cors')
const KoaStatic = require('koa-static')
const parameter = require('koa-parameter')
const Router = require('../route')
const errHandle = require('./errHandle')
const path = require('path')
const views = require('koa-views')
const { isLogin } = require('../middleware/auth.middleware')

const app = new Koa()

app.use(views(path.join(__dirname, '../views/'), { extension: 'html' }))

app.use(cors())

app.use(koaBody({
    multipart: true,
    formidable: {
        uploadDir: path.join(__dirname, '../upload'),
        keepExtensions: true
    }
}))
app.use(KoaStatic(path.join(__dirname, '../upload/')))
app.use(parameter(app))
app.use(isLogin)
Router.forEach(route => {
    app.use(route.routes())
})
app.on('error', errHandle)
module.exports = app
