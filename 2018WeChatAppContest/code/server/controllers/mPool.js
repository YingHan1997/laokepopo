const { mysql } = require('../qcloud')
const mError = require('../error/mError')
const messageService = require('../service/mMessage')

const tableName = 'mPool'
const tableName2 = 'mPoolGood'

module.exports = {
    get: async (ctx, next) => {
        const ex = await mysql('mTopic')
            .select('pool_id')

        // const { page: pageStr, size: sizeStr, order = 'id' } = ctx.request.query
        const { page: pageStr, size: sizeStr, order = 'id' } = ctx.state.$data
        const page = parseInt(pageStr)
        const size = parseInt(sizeStr)
        if (page > 0 && size > 0) {
            const result = await mysql(tableName)
                .select('*')
                .whereNotIn('id', ex.map(value => value.pool_id))
                .orderBy(order, 'desc')
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

    post: async (ctx, next) => {
        // const data = ctx.request.body
        const data = ctx.state.$data
        const { key } = data
        const token = (await mysql('mMessage').select('*').where({ id: key }))[0]
        const system = (await mysql('mSystem').select('*').where({ id: 1 }))[0]
        delete data['key']
        if ((token.type === 1 && token.open_id === data.open_id && token.has_read == 0) || data.open_id === system.open_id) {
            // data.open_id = data.open_id
            data.create_time = new Date()
            data.update_time = new Date()
            data.good_point = 0
            const result = await mysql(tableName).insert(data)
            if (data.open_id !== system.open_id) {
                await mysql('mMessage').update({ has_read: 1 }).where({ id: key })
            }
            ctx.state.data = {
                result,
            }
        } else {
            /*
            ctx.state.data = Object.assign(mError.NO_CHANCE, {
                data,
                token,
                system,
            })
            */
            ctx.state.data = mError.NO_CHANCE
        }
    },

    delete: async (ctx, next) => {
        // const data = ctx.request.query
        const result = await mysql(tableName).del().where({
            id: ctx.state.$data.id
        })
        ctx.state.data = {
            result
        }
    },

    put: async (ctx, next) => {
        // const data = ctx.request.body
        const data = ctx.state.$data
        data.update_time = new Date()
        const result = await mysql(tableName).update(data).where({
            id: data.id
        })
        ctx.state.data = {
            result
        }
    },

    detail: async (ctx, next) => {
        const result = await mysql(tableName).select('*').where({
            id: ctx.state.$data.id
        })
        ctx.state.data = {
            result,
        }
    },

    // 点赞消息
    addGood: async (ctx, next) => {
      console.log('点赞')
        const result = await mysql(tableName2)
            .select('*')
            .where(ctx.state.$data)
        if (result.length === 0) {
            const result1 = await mysql(tableName2).insert(ctx.state.$data)
            const result2 = await mysql(tableName)
                .where({
                    id: ctx.state.$data.pool_id
                })
                .increment('good_point', 1)
            ctx.state.data = Object.assign(mError.SUCCESS, {
                result,
                result1,
                result2,
            })

            try {
                const prepare = (await mysql(tableName).select('*').where({
                    id: ctx.state.$data.pool_id
                }))[0]

                await messageService.send({
                    type: 2,
                    open_id: prepare.open_id,
                    content: '您的话题池收获了一个赞',
                    link1: ctx.state.$data.pool_id,
                    link2: ctx.state.$data.open_id
                })
            } catch (e) {
                ctx.state.data['warning'] = 'message send fail!'
            }
        } else {
            ctx.state.data = mError.HAS_GOOD
        }
    },

    removeGood: async (ctx, next) => {
        const result = await mysql(tableName2)
            .select('*')
            .where(ctx.state.$data)
        if (result.length === 0) {
            ctx.state.data = mError.NO_GOOD
        } else {
            const result1 = await mysql(tableName2).del().where(ctx.state.$data)
            const result2 = await mysql(tableName)
                .where({
                    id: ctx.state.$data.pool_id
                })
                .decrement('good_point', 1)
            ctx.state.data = Object.assign(mError.SUCCESS, {
                result,
                result1,
                result2,
            })
        }
    }
}