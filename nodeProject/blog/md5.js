const common = require('./libs/common.js')

var str = common.md5('123456'+common.key)

console.log(str)
