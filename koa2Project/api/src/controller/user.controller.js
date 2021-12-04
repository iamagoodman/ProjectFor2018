const { createUser, getUserInfo } = require('../service/user.service')

class UserController {
    async register(ctx, next) {
        // 1.获取数据
        console.log(ctx.request.body)
        // 2.操作数据库
        const { user_name, password } = ctx.request.body;
        // 验证数据 合法性
        if (!user_name || !password) {
            console.error('用户名或密码为空', ctx.request.body)
            ctx.status = 400
            ctx.body = {
                code: '10001',
                message: '用户名或密码为空',
                result: ''
            }
            return
        }
        // 验证数据 合理性
        if (getUserInfo({ user_name })) {
            ctx.status = 409
            ctx.body = {
                code: '10009',
                message: '用户已存在',
                result: ''
            }
            return 
        }
        const res = await createUser(user_name, password)
        // 3.返回结果
        ctx.body = {
            code: '1',
            message: 'success',
            data: res
        }
    }
    async login(ctx, next) {
        ctx.body = '登陆成功'
    }
}

module.exports = new UserController()