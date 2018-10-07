const { mysql } = require('../qcloud')
const mError = require('../error/mError')
const messageService = require('../service/mMessage')

const tableName = 'mMessage'

/*
| type | 描述 | link1 | link2 |
|---|---|---|---|
| 0 | 系统推送 | -1 | -1 |
| 1 | 话题池奖励 | rank_id | -1 |
| 2 | 话题池点赞 | pool_id | 对方的 open_id |
| 3 | 话题被选中 | topic_id | -1 |
| 4 | 评论被点赞 | comment_id | 对方的 open_id |
| 5 | 评论被收藏 | comment_id | 对方的 open_id |
*/

module.exports = {
    post: async (ctx, next) => {
        const result = await messageService.send(ctx.state.$data)
        ctx.state.data = {
            result,
        }
    },

    get: async (ctx, next) => {
        const { open_id } = ctx.state.$data
        const result = await mysql(tableName)
            .select('*')
            .where({
                open_id,
                has_read: 0,
            })
            .orderBy('id', 'desc')
        ctx.state.data = {
            size: result.length,
            result,
        }
    },

    put: async (ctx, next) => {
        const { id } = ctx.state.$data
        const result = await mysql(tableName)
            .update({
                has_read: 1,
            })
            .where({
                id
            })

        ctx.state.data = {
            result
        }
    },
}