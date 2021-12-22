const Koa = require('koa')
const koaBody = require('koa-body')
const cors = require('koa2-cors')
const Router = require('../route')
const errHandle = require('./errHandle')
const path = require('path')
const views = require('koa-views')

const app = new Koa()

app.use(views(path.join(__dirname, '../views/'), { extension: 'html' }))

app.use(cors())

app.use(koaBody({
    multipart: true,
    formidable: {
        uploadDir: path.join(__dirname, '../upload/'),
        keepExtensions: true
    }
}))
Router.forEach(route => {
    app.use(route.routes())
})
app.on('error', errHandle)
module.exports = app
