const Mock = require('../model/mock.model')

class MockService {
    async createMock(mockData) {
        // todo 写入数据库
        const res = await Mock.create({ ...mockData })
        return res ? res.dataValues : null
    }
    async getMockList(mockData) { // author_id -> 查询该author_id所有的项目
        const res = await Mock.findAll({
            where: mockData,
            attributes: { exclude: ['project_detail'] }
        })
        return res ? res : null
    }
    async getMockItem(mockData) { // id 或 uuid
        const res = await Mock.findOne({
            where: mockData
        })
        return res ? res.dataValues : null
    }
    async updateMock(mockData) {
        const res = await Mock.update(mockData, {
            where: {
                id: mockData.id
            }
        })
        return res ? res.dataValues : null
    }
    async deleteMock(mockData) {
        const res = await Mock.destroy({
            where: mockData
        })
    }
}

module.exports = new MockService()