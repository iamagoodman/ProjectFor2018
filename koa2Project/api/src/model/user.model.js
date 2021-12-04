const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建模型 koa_user => koa_users
const User = seq.define('koa_user', {
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '用户名，唯一'
    },
    password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment: '密码'
    },
    sex: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'F',
        comment: '性别'
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        comment: '是否为管理员，0不是，1是'
    }
})
// 强制同步数据库
// User.sync({ force: true })

module.exports = User