const { createMock, updateMock, getMockList, getMockItem, deleteMock } = require('../service/mock.service')

const { mockError } = require('../constant/err.type')

class MockController {
    async save(ctx, next) {
        try {
            const { id, uuid, ...mockData } = ctx.request.body
            const { id: author_id, user_name } = ctx.state.user
            let res
            if (!id) {
              res = await createMock({ ...mockData, uuid, author_id, author: user_name })
            } else {
                res = await updateMock({ id, uuid, ...mockData, author_id })
            }
            // 3.返回结果
            ctx.body = {
                code: '10200',
                message: 'success',
                result: {
                    ...res
                }
            }
        }catch (e) {
            console.error(e)
            ctx.app.emit('error', mockError, ctx)
        }
        
    }
    async getList(ctx, next) {
        try {
            const { id: author_id } = ctx.state.user
            const res = await getMockList({ author_id })
            ctx.body = {
                code: '10200',
                message: 'success',
                result: res
            }
        }catch (e) {
            console.error(e)
            ctx.app.emit('error', mockError, ctx)
        }
    }
    async getItem(ctx, next) {
        try {
            const { id: author_id } = ctx.state.user
            const { id } = ctx.request.query
            console.log('id', id)
            const res = await getMockItem({ id, author_id })
            ctx.body = {
                code: '10200',
                message: 'success',
                result: {
                    id: res.id,
                    ...JSON.parse(res.project_detail)
                }
            }
        }catch (e) {
            console.error(e)
            ctx.app.emit('error', mockError, ctx)
        }
    }

    async deleteItem(ctx, next) {
        try {
            const mockData = ctx.request.body
            const res = await deleteMock(mockData)
            ctx.body = {
                code: '10200',
                message: 'success',
                result: {
                    ...res
                }
            }
        }catch (e) {
            console.error(e)
            ctx.app.emit('error', mockError, ctx)
        }
    }
}

module.exports = new MockController()