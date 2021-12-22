const jwt = require('jsonwebtoken')
const { PRO_SECRET } = require('../config/config.default')
const Error = require('../constant/err.type')
const { whiteUrlList } = require('../constant')
const userAuth = async (ctx, next) => {
  const { authorization } = ctx.request.header
  try {
    const token = authorization.replace('Bearer ', '')
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

const isAdmin = async (ctx, next) => {
  const { is_admin } = ctx.state.user
  if (!is_admin) {
    console.error('该用户没有管理员的权限', ctx.state.user)
    return ctx.app.emit('error', Error.isNotAdmin, ctx)
  }
  await next()
}

const isLogin = async (ctx, next) => {
  const { url } = ctx.request
  const { authorization } = ctx.request.header
  if (!whiteUrlList.includes(url) && !authorization) { // 不是登录接口，且没有token的情况下，返回登录
    return ctx.app.emit('error', Error.isNotLogin, ctx)
  }
  await next()
}

module.exports = {
  isLogin,
  userAuth,
  isAdmin
}