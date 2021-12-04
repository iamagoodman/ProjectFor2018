const User = require('../model/user.model')

class UserService {
    async createUser(user_name, password) {
        // todo 写入数据库
        // const req = { user_name, password }
        const res = await User.create({ user_name, password })
        console.log(res)
        return res.dataValues
    }
    async getUserInfo(user) {
        const Opt = { ...user }
        const res = User.findOne({
            attributes: Object.keys(user).map(key => (key)),
            where: user
        })
        return res ? res.dataValues : null
    }
}

module.exports = new UserService()