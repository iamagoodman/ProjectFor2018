const { Sequelize } = require('sequelize')
const { 
    MYSQL_HOST, 
    MYSQL_PORT, 
    MYSQL_USER,
    MYSQL_PWD,
    MYSQL_DB
} = require('../config/config.default')

const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    dialect: 'mysql'
})

// seq.authenticate()
//     .then(() => {
//         console.log('链接成功')
//     })
//     .catch((err) => {
//         console.log(err)
//         console.log('链接失败')
//     })

module.exports = seq