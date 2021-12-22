const jwt = require('jsonwebtoken')

const { createUser, getUserInfo, updateById } = require('../service/user.service')

const { userRegisterError } = require('../constant/err.type')

const { PRO_SECRET } = require('../config/config.default')
class UserController {
    async register(ctx, next) {
        // 1.获取数据
        // console.log(ctx.request.body)
        // 2.操作数据库
        const { user_name, password, email } = ctx.request.body;
        // 验证数据 合法性
        // 验证数据 合理性
        try {
            const res = await createUser({
                user_name,
                password,
                email
            })
            // 3.返回结果
            ctx.body = {
                code: '10200',
                message: 'success',
                data: res
            }
        }catch (e) {
            console.error(e)
            ctx.app.emit('error', userRegisterError, ctx)
        }
        
    }
    async login(ctx, next) {
        const { user_name } = ctx.request.body
        // 获取用户信息（在token的playload中记录id，user_name，is_admin）、
        try {
            // 剔除password
            const { password, ...res } = await getUserInfo({ user_name })
            ctx.body = {
                code: 10200,
                message: '用户登录成功',
                result: {
                    token: jwt.sign(res, PRO_SECRET, { expiresIn: '1h' })
                }

            }
        }catch (e) {
            console.error('用户登录失败', e)
        }
        // ctx.body = `欢迎回来${user_name}`
    }
    async modifyUser(ctx, next) {
        // 获取数据， 操作数据库， 返回结果
        const { id } = ctx.state.user
        const user = ctx.request.body
        console.log('id', id, 'user', user)
        if (await updateById({ id, ...user })) {
            ctx.body = {
                code: '10200',
                message: '用户信息更新成功',
                result: ''
            }
        } else {
            ctx.body = {
                code: '10007',
                message: '更新用户信息失败',
                result: ''
            }
        }
    }
}

module.exports = new UserController()