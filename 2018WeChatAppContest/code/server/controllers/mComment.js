const { mysql } = require('../qcloud')
const mError = require('../error/mError')
const messageService = require('../service/mMessage')

const tableName = 'mComment'
const tableName2 = 'mCommentGood'
const tableName3 = 'mCommentSave'

const addGlobalGood = async (ifif) => {
    const result = await mysql('mRank').select('*').where(ifif)
    if (result.length > 0) {
        return await mysql('mRank')
            .where(ifif)
            .increment('point', 1)
    } else {
        return await mysql('mRank')
            .insert(Object.assign(ifif, {
                point: 1
            }))
    }
}

const removeGlobalGood = async (ifif) => {
    return await mysql('mRank')
        .where(ifif)
        .decrement('point', 1)
}

module.exports = {
    get: async (ctx, next) => {
        const { page: pageStr, size: sizeStr, topic_id, pool_id, order = 'id' } = ctx.state.$data
        const page = parseInt(pageStr)
        const size = parseInt(sizeStr)
        if (page > 0 && size > 0) {
            const result = await mysql(tableName)
                .select('*')
                .where({
                    topic_id,
                    pool_id,
                })
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
        const data = ctx.state.$data

        const { open_id, topic_id, pool_id } = data
        const pro_result = await mysql(tableName)
            .select('*')
            .where({
                open_id,
                topic_id,
                pool_id,
            })
        if (pro_result.length > 0) {
            const res = await mysql(tableName)
                .update({
                    content: data.content,
                    update_time: data.update_time,
                }).where({
                    id: pro_result[0].id
                })
            ctx.state.data = {
                result: pro_result,
            }
        } else {
            const rank_id = (await mysql('mSystem')
                .select('*')
                .where({
                    id: 1
                }))[0].rank_id
            data.create_time = new Date()
            data.update_time = new Date()
            data.good_point = 0
            data.save_point = 0
            data.rank_id = rank_id
            const result = await mysql(tableName).insert(data)
            ctx.state.data = {
                result,
            }
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
        data.update_time = new Date()
        const result = await mysql(tableName).update(data).where({
            id: data.id
        })
        ctx.state.data = {
            result
        }
    },

    detailGet: async (ctx, next) => {
        const result = await mysql(tableName).select('*').where({
            id: ctx.state.$data.id
        })
        ctx.state.data = {
            result,
        }
    },

    detailPost: async (ctx, next) => {
        const { open_id, topic_id, pool_id } = ctx.state.$data
        const result = await mysql(tableName)
            .select('*')
            .where({
                open_id,
                topic_id,
                pool_id,
            })
        ctx.state.data = {
            result: result.length > 0
        }
    },

    // 点赞消息
    addGood: async (ctx, next) => {
        const prepare = (await mysql(tableName).select('*').where({
            id: ctx.state.$data.comment_id
        }))[0]

        const result = await mysql(tableName2)
            .select('*')
            .where(ctx.state.$data)
        if (result.length === 0) {
            const result1 = await mysql(tableName2).insert(ctx.state.$data)
            const result2 = await mysql(tableName)
                .where({
                    id: ctx.state.$data.comment_id,
                })
                .increment('good_point', 1)

            await addGlobalGood({
                open_id: prepare.open_id,
                rank_id: prepare.rank_id,
            })

            ctx.state.data = Object.assign(mError.SUCCESS, {
                result,
                result1,
                result2,
            })

            try {
                await messageService.send({
                    type: 4,
                    open_id: prepare.open_id,
                    content: '您的评论收获了一个赞',
                    link1: ctx.state.$data.comment_id,
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
        const prepare = (await mysql(tableName).select('*').where({
            id: ctx.state.$data.comment_id
        }))[0]

        const result = await mysql(tableName2)
            .select('*')
            .where(ctx.state.$data)
        if (result.length === 0) {
            ctx.state.data = mError.NO_GOOD
        } else {
            const result1 = await mysql(tableName2).del().where(ctx.state.$data)
            const result2 = await mysql(tableName)
                .where({
                    id: ctx.state.$data.comment_id,
                })
                .decrement('good_point', 1)

            await removeGlobalGood({
                open_id: prepare.open_id,
                rank_id: prepare.rank_id,
            })

            ctx.state.data = Object.assign(mError.SUCCESS, {
                result,
                result1,
                result2,
            })
        }
    },

    // 收藏消息
    addSave: async (ctx, next) => {
        const result = await mysql(tableName3)
            .select('*')
            .where(ctx.state.$data)
        if (result.length === 0) {
            const result1 = await mysql(tableName3).insert(ctx.state.$data)
            const result2 = await mysql(tableName)
                .where({
                    id: ctx.state.$data.comment_id,
                })
                .increment('save_point', 1)
            ctx.state.data = Object.assign(mError.SUCCESS, {
                result,
                result1,
                result2,
            })

            try {
                const prepare = (await mysql(tableName).select('*').where({
                    id: ctx.state.$data.comment_id
                }))[0]

                await messageService.send({
                    type: 5,
                    open_id: prepare.open_id,
                    content: '您的评论收获了一个收藏',
                    link1: ctx.state.$data.comment_id,
                    link2: ctx.state.$data.open_id
                })
            } catch (e) {
                ctx.state.data['warning'] = 'message send fail!'
            }
        } else {
            ctx.state.data = mError.HAS_SAVE
        }
    },

    removeSave: async (ctx, next) => {
        const result = await mysql(tableName3)
            .select('*')
            .where(ctx.state.$data)
        if (result.length === 0) {
            ctx.state.data = mError.NO_SAVE
        } else {
            const result1 = await mysql(tableName3).del().where(ctx.state.$data)
            const result2 = await mysql(tableName)
                .where({
                    id: ctx.state.$data.comment_id,
                })
                .decrement('save_point', 1)
            ctx.state.data = Object.assign(mError.SUCCESS, {
                result,
                result1,
                result2,
            })
        }
    }
}