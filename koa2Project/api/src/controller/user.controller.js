const { createUser, getUserInfo } = require('../service/user.service')

class UserController {
    async register(ctx, next) {
        // 1.获取数据
        console.log(ctx.request.body)
        // 2.操作数据库
        const { user_name, password } = ctx.request.body;
        // 验证数据 合法性
        // 验证数据 合理性
        
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