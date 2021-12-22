const jwt = require('jsonwebtoken')
const { PRO_SECRET } = require('../config/config.default')
const Error = require('../constant/err.type')
const userAuth = async (ctx, next) => {
  const { authorization } = ctx.request.header
  const token = authorization.replace('Bearer ', '')
  try {
    const user = jwt.verify(token, PRO_SECRET)
    ctx.state.user = user
  }catch (e) {
    switch (e.name) {
      case 'TokenExpiredError':
        return ctx.app.emit('error', Error.tokenExpiredError, ctx)
      case 'JsonWebTokenError':
        console.error('无效token')
        return ctx.app.emit('error', Error.invalidToken, ctx)
    }
  }
  await next()
}

module.exports = {
  userAuth
}