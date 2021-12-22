const fs = require('fs')

let routers = []
fs.readdirSync(__dirname).forEach(file => {
    if (file !== 'index.js') {
        routers.push(require('./' + file))
    }
})

module.exports = routers