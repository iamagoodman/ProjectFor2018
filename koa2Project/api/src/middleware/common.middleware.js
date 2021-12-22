const fs = require('fs')

const renderHtml = async(ctx, next) => {
    const { user_name } = ctx.request.body
    try{
        const res = await getUserInfo({ user_name })
        if (res) {
            ctx.app.emit('error', userErr.userExited, ctx)
            return 
        }
    }catch(e) {
        ctx.app.emit('error', userErr.userRegisterError, ctx)
        return
    }
    await next()
}

module.exports = {
    renderHtml
}