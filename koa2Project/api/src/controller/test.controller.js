const { createTestData, getTestData } = require('../service/test.service')

const { userRegisterError } = require('../constant/err.type')

class TestController {
  async createData (ctx, next) {
    try {
      const res = await createTestData({ ...ctx.request.body })
      // 3.返回结果
      ctx.body = {
        code: '10200',
        message: 'success',
        result: {
          ...res
        }
      }
    } catch (e) {
      // console.error(e)
      ctx.app.emit('error', userRegisterError, ctx)
    }
  }
  async queryData (ctx, next) {
    try {
      const res = await getTestData({ ...ctx.request.body })
      // 3.返回结果
      ctx.body = {
        code: '10200',
        message: 'success',
        result: {
          ...res
        }
      }
    } catch (e) {
      console.error(e)
      ctx.app.emit('error', userRegisterError, ctx)
    }
  }
}

module.exports = new TestController()