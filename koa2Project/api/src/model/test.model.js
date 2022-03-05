const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建模型 koa_user => koa_users
const Test = seq.define('koa_tests', {
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  rrweb_source: {
    type: DataTypes.TEXT(),
    allowNull: false,
    // unique: true,
  }
})
// 强制同步数据库 没有表就创建表
// Test.sync({ force: true })

module.exports = Test