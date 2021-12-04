const { getUserInfo } = require('../service/user.service')
const userErr = require('../constant/err.type')
const userValidDator = async(ctx, next) => {
    const { user_name, password } = ctx.request.body
    if (!user_name || !password) {
        console.error('用户名或密码为空', ctx.request.body)
        // ctx.status = 400
        // ctx.body = {
        //     code: '10001',
        //     message: '用户名或密码为空',
        //     result: ''
        // }
        ctx.app.emit('error', userErr.userFormateError, ctx) 
        return
    }
    await next()
}

const verifyUser = async(ctx, next) => {
    const { user_name } = ctx.request.body

    if (await getUserInfo({ user_name })) {
        // ctx.status = 409
        // ctx.body = {
        //     code: '10009',
        //     message: '用户已存在',
        //     result: ''
        // }
        ctx.app.emit('error', userErr.userExited, ctx)
        return 
    }
    await next()
}
module.exports = {
    userValidDator,
    verifyUser 
}