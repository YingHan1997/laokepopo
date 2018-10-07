const { mysql } = require('../qcloud')
const mError = require('../error/mError')

const tableName = 'mCallback'

const insertSerivce = async (ctx, next) => {
    const data = ctx.state.$data
    data.create_time = new Date()
    const result = await mysql(tableName).insert(data)
    ctx.state.data = {
        result
    }
}

module.exports = {
    post: insertSerivce,
    put: insertSerivce,

    delete: async (ctx, next) => {
        // const data = ctx.request.query
        const result = await mysql(tableName).del().where({
            id: ctx.state.$data.id
        })
        ctx.state.data = {
            result
        }
    },

    get: async (ctx, next) => {
        const { page: pageStr, size: sizeStr } = ctx.state.$data
        const page = parseInt(pageStr)
        const size = parseInt(sizeStr)
        if (page > 0 && size > 0) {
            const result = await mysql(tableName)
                .select('*')
                .orderBy('id', 'desc')
                .limit(size)
                .offset((page - 1) * size)
            ctx.state.data = {
                size: result.length,
                result,
            }
        } else {
            ctx.state.data = mError.NO_DATA
        }
    },
}