const Router = require('koa-router')
const router = new Router({ prefix: '/upload' })
const { userAuth, isAdmin } = require('../middleware/auth.middleware')
const { faceImgUpload } = require('../controller/upload.controller')
// 上传接口
router.post('/face-img', userAuth, isAdmin, faceImgUpload)

module.exports = router