class UserService {
    async createUser(user_name, password) {
        // todo 写入数据库
        return '写入成功'
    }
}

module.exports = new UserService()