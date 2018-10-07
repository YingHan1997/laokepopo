const { mysql } = require('../qcloud')
const mError = require('../error/mError')
const rankService = require('../service/mRank')

const tableName = 'mComment'

module.exports = {
    get: async (ctx, next) => {
        const { page: pageStr, size: sizeStr } = ctx.state.$data
        const page = parseInt(pageStr)
        const size = parseInt(sizeStr)
        if (page > 0 && size > 0) {
            if (ctx.state.$data.ids === undefined || ctx.state.$data.ids === "") {
                const result = await rankService.rank(size, (page - 1) * size)
                ctx.state.data = {
                    size: result.rank.length,
                    result: result.rank,
                    rank_id: result.rank_id,
                    $data: ctx.state.$data,
                }
            } else {
                const ids = ctx.state.$data.ids.split(',')
                const result = await rankService.rankInGroup(size, (page - 1) * size, ids)
                ctx.state.data = {
                    size: result.rank.length,
                    result: result.rank,
                    rank_id: result.rank_id,
                    $data: ctx.state.$data,
                }
            }
        } else {
            ctx.state.data = mError.NO_DATA
        }
    },
}