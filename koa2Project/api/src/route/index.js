const rootRouter = require('./root')

const userRouter = require('./user')

const aboutRouter = require('./about')

module.exports = [
    rootRouter,
    userRouter,
    aboutRouter
]