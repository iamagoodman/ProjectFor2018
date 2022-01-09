const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建模型 mock_project => mock_project
const Mock = seq.define('mock_project', {
    author: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '项目作者名'
    },
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '项目创建者'
    },
    remarks: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '项目备注'
    },
    uuid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: 'uuid 唯一键'
    },
    project_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        comment: '项目名称'
    },
    project_detail: {
        type: DataTypes.TEXT('medium'),
        allowNull: false,
        comment: '项目详情'
    },
    allow_auth_list: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '有权限的人列表'
    }
})
// 强制同步数据库 没有表就创建表
// Mock.sync({ force: true })

module.exports = Mock