const path = require('path')

const { fileUploadError, unSupportedFileType } = require('../constant/err.type')

class UploadController {
    async faceImgUpload(ctx, next) {
        const { file } = ctx.request.files
        const fileTypes = ['image/jpeg', 'image/png']
        if (file) {
            if (!fileTypes.includes(file.type)) {
                return ctx.app.emit('error', unSupportedFileType, ctx)
            }
            ctx.body = {
                code: '10200',
                message: '商品图片上传成功',
                result: {
                    goods_img: path.basename(file.path),
                },
            }
        } else {
            return ctx.app.emit('error', fileUploadError, ctx )
        }
    }
}

module.exports = new UploadController()