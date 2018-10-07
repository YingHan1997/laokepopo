const { mysql } = require('../qcloud')
const mError = require('../error/mError')
const topicService = require('../service/mTopic')

const tableName = 'mTopic'

module.exports = {

    post: async (ctx, next) => {
        // const data = ctx.request.body
        const data = ctx.state.$data
        data.time = new Date(parseInt(data.time))
        const result = await topicService.insert(data)
        ctx.state.data = {
            result
        }
    },

    delete: async (ctx, next) => {
        const result = await mysql(tableName).del().where({
            id: ctx.state.$data.id
        })
        ctx.state.data = {
            result
        }
    },

    put: async (ctx, next) => {
        const data = ctx.state.$data
        data.time = new Date(parseInt(data.time))
        const result = await mysql(tableName).update(data).where({
            id: data.id
        })
        ctx.state.data = {
            result
        }
    },

    get: async (ctx, next) => {
        const { page: pageStr, size: sizeStr, type = 0 } = ctx.state.$data
        const page = parseInt(pageStr)
        const size = parseInt(sizeStr)
        if (page > 0 && size > 0) {
            if (type == -1) {
                const result = await mysql(tableName)
                    .select('*')
                    .orderBy('time', 'desc')
                    .limit(size)
                    .offset((page - 1) * size)
                ctx.state.data = {
                    size: result.length,
                    result,
                }
            } else {
                const result = await mysql(tableName)
                    .select('*')
                    .where({
                        type
                    })
                    .orderBy('time', 'desc')
                    .limit(size)
                    .offset((page - 1) * size)
                ctx.state.data = {
                    size: result.length,
                    result,
                }
            }
        } else {
            ctx.state.data = mError.NO_DATA
        }
    },

    detail: async (ctx, next) => {
        const result = await mysql('mPool')
            .select('mPool.*')
            .leftJoin(tableName, tableName + '.pool_id', 'mPool.id')
            .where('mTopic.id', ctx.state.$data.id)
        ctx.state.data = {
            result,
        }
    },
}