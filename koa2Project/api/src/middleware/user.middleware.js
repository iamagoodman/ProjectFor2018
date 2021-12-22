const bcrypt = require('bcryptjs')

const { getUserInfo } = require('../service/user.service')
const userErr = require('../constant/err.type')
const { createValidMessage } = require('../utils')
const { userValid } = require('../constant/paramsValid')
const userValidDator = async(ctx, next) => {
    try {
        ctx.verifyParams(userValid)
    }catch (e) {
        console.error('e', e)
        return ctx.app.emit('error', createValidMessage(e.errors), ctx)
    }
    // const { user_name, password } = ctx.request.body
    // if (!user_name || !password) {
    //     console.error('用户名或密码为空', ctx.request.body)
    //     ctx.app.emit('error', userErr.userFormateError, ctx)
    //     return
    // }
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
        ctx.app.emit('error', userErr.userRegisterError, ctx)
        return
    }
    await next()
}

const crpyPassword = async (ctx, next) => {
    const { password } = ctx.request.body
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    ctx.request.body.password = hash
    await next()
}

const verifyLogin  = async (ctx, next) => {
    const { user_name, password } = ctx.request.body
    // 判断用户是否存在， 密码是否匹配
    try {
        const res = await getUserInfo({ user_name })
        if (res) {
            console.log('res', res)
            if (!bcrypt.compareSync(password, res.password)) {
                ctx.app.emit('error', userErr.userNOrPError, ctx)
                return
            } else {
                await next()
            }
        } else {
            ctx.app.emit('error', userErr.userNotExist, ctx)
            return
        }
    } catch (e) {
        ctx.app.emit('error', userErr.userLoginError, ctx)
        return
    }
}
module.exports = {
    userValidDator,
    verifyUser,
    crpyPassword,
    verifyLogin
}