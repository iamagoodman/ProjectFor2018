const Mock = require('../model/test.model')

class MockService {
  async createTestData (testData) {
    // todo 写入数据库
    const res = await Mock.create({ ...testData })
    return res ? res.dataValues : null
  }
  async getTestData (testData) { // author_id -> 查询该author_id所有的项目
    const res = await Mock.findAll({
      where: testData,
      // attributes: { exclude: ['rrweb_source'] }
    })
    return res ? res : null
  }
}

module.exports = new MockService()