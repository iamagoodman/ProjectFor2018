const { getUserInfo } = require('../service/user.service')
const userErr = require('../constant/err.type')
const userValidDator = async(ctx, next) => {
    const { user_name, password } = ctx.request.body
    if (!user_name || !password) {
        console.error('用户名或密码为空', ctx.request.body)
        ctx.app.emit('error', userErr.userFormateError, ctx) 
        return
    }
    await next()
}

const verifyUser = async(ctx, next) => {
    const { user_name } = ctx.request.body
    try{
        const res = await getUserInfo({ user_name })
        if (res) {
            ctx.app.emit('error', userErr.userExited, ctx)
            return 
        }
    }catch(e) {
        console.error('err 21')
        ctx.app.emit('error', userErr.userRegisterError, ctx)
        return
    }
    await next()
}
module.exports = {
    userValidDator,
    verifyUser 
}