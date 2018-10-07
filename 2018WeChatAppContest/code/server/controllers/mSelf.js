const { mysql } = require('../qcloud')
const mError = require('../error/mError')

const tableName_mComment = 'mComment'
const tableName_mCommentSave = 'mCommentSave'
const tableName_mPool = 'mPool'
const tableName_mTopic = 'mTopic'

module.exports = {
    // 我的收藏（收藏的评论）
    save: async (ctx, next) => {
        const { page: pageStr, size: sizeStr, open_id } = ctx.state.$data
        const page = parseInt(pageStr)
        const size = parseInt(sizeStr)
        if (page > 0 && size > 0) {
            const temp = {}
            temp[tableName_mCommentSave + '.open_id'] = open_id
            const result = await mysql(tableName_mCommentSave)
                .select('mPool.image', 'mPool.content as topic_content', tableName_mComment+'.*')
                .leftJoin(tableName_mComment, tableName_mComment + '.id', tableName_mCommentSave + '.comment_id')
                .leftJoin(tableName_mPool, tableName_mPool + '.id', tableName_mComment + '.pool_id')
                .where(temp)
                .orderBy(tableName_mCommentSave + '.id', 'desc')
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
    // 我的话题（发布的话题）
    topic: async (ctx, next) => {
        const { page: pageStr, size: sizeStr, open_id } = ctx.state.$data
        const page = parseInt(pageStr)
        const size = parseInt(sizeStr)
        if (page > 0 && size > 0) {
            const result = await mysql(tableName_mPool)
                // tableName_mPool + '.id', tableName_mTopic + '.id'
                .select('*')
                .leftJoin(tableName_mTopic, tableName_mPool + '.id', tableName_mTopic + '.pool_id')
                .where({
                    open_id,
                })
                .orderBy(tableName_mPool + '.id', 'desc')
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
    // 我的参与（发布的评论）
    comment: async (ctx, next) => {
        const { page: pageStr, size: sizeStr, open_id } = ctx.state.$data
        const page = parseInt(pageStr)
        const size = parseInt(sizeStr)
        if (page > 0 && size > 0) {
            const temp = {}
            temp[tableName_mComment + '.open_id'] = open_id
            const result = await mysql(tableName_mComment)
                .select('mPool.image', 'mPool.content as topic_content', 'mComment.*')
                .leftJoin(tableName_mPool, tableName_mPool + '.id', tableName_mComment + '.pool_id')
                .where(temp)
                .orderBy(tableName_mComment + '.id', 'desc')
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