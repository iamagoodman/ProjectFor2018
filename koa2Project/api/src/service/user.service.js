const User = require('../model/user.model')

class UserService {
    async createUser(user) {
        // todo 写入数据库
        // const req = { user_name, password }
        const res = await User.create({ ...user })
        return res.dataValues
    }
    async getUserInfo(user) {
        const Opt = { ...user }
        // const keys = Object.keys(user).map(key => (key))
        // 不能用 灵活的key， id， user_name， password
        const res = await User.findOne({
            // attributes: keys,
            attributes: ['id', 'user_name', 'password', 'is_admin'],
            where: user
        })
        return res ? res.dataValues : null
    }
    async updateById({ id, ...userInfo }) {
        const whereOpt = {id}
        const res = await User.update(userInfo, {
            where: whereOpt
        })
        return res[0] > 0
    }
}

module.exports = new UserService()