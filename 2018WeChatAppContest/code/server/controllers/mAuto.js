const { mysql } = require('../qcloud')
const mError = require('../error/mError')
const messageService = require('../service/mMessage')
const topicService = require('../service/mTopic')
const rankService = require('../service/mRank')

// TODO: 话题自动更换系统

const get_pool_id = async (size) => {
    const ex = await mysql('mTopic')
        .select('pool_id')
    const result = await mysql('mPool')
        .select('id')
        .whereNotIn('id', ex.map(value => value.pool_id))
        .orderBy('good_point', 'desc')
        .limit(size)

    const len = result.length
    if (len > 0) {
        const rand = Math.floor(Math.random() * len)
        return {
            pool_id: result[rand].id,
            ex: ex.map(value => value.pool_id),
            result
        }
    } else {
        return {
            pool_id: -1
        }
    }
}

// 获取排行（{ rank_id, ids }）
const get_rank = async (size) => {
    const { rank_id, rank } = await rankService.rank(size, 0)
    return {
        rank_id,
        ids: rank.map(value => value.open_id),
    }
}

// 话题池奖励（ Send Message ）
const send_choices = async (open_id, rank_id, choices) => {
    for (let i = 0; i < choices; i++) {
        try {
            await messageService.send({
                type: 1,
                open_id: open_id,
                content: '您的获得一次向话题池添加话题的机会',
                link1: rank_id
            })
        } catch (e) { }
    }
}

module.exports = {
    day: async (ctx, next) => {
        // 随机获取话题池id
        const { pool_id, ex, result: ex_result } = await get_pool_id(10)
        if (pool_id <= 0) {
            ctx.state.data = mError.NO_DATA
        } else {
            const topic_id = (await topicService.insert({
                type: 0,
                pool_id,
                time: new Date()
            }))[0]

            const result = await mysql('mSystem')
                .update({
                    day_topic_id: topic_id
                })
                .where({
                    id: 1
                })

            ctx.state.data = {
                pool_id,
                topic_id,
                ex, ex_result
            }

            // 话题被选中（ Send Message ）
            try {
                const prepare = (await mysql('mPool').select('*').where({
                    id: pool_id
                }))[0]

                await messageService.send({
                    type: 3,
                    open_id: prepare.open_id,
                    content: '您的话题被选中为日话题',
                    link1: topic_id
                })
            } catch (e) {
                ctx.state.data['warning'] = 'message send fail!'
            }
        }
    },

    week: async (ctx, next) => {
        const { rank_id, ids } = await get_rank(10)
        try {
            // 话题池奖励（ Send Message ）
            await send_choices(ids[0], rank_id, 3)
            await send_choices(ids[1], rank_id, 2)
            await send_choices(ids[2], rank_id, 1)
        } catch (e) { }

        // 随机获取话题池id
        const { pool_id, ex, result: ex_result } = await get_pool_id(3)
        if (pool_id <= 0) {
            ctx.state.data = mError.NO_DATA
        } else {
            const topic_id = (await topicService.insert({
                type: 1,
                pool_id,
                time: new Date()
            }))[0]

            await mysql('mSystem')
                .increment('rank_id', 1)
                .where({
                    id: 1
                })
            await mysql('mSystem')
                .update({
                    week_topic_id: topic_id
                })
                .where({
                    id: 1
                })

            ctx.state.data = {
                pool_id,
                topic_id,
                rank_id,
                ids,
                ex, ex_result
            }

            // 话题被选中（ Send Message ）
            try {
                const prepare = (await mysql('mPool').select('*').where({
                    id: pool_id
                }))[0]

                await messageService.send({
                    type: 3,
                    open_id: prepare.open_id,
                    content: '您的话题被选中为周话题',
                    link1: topic_id
                })
            } catch (e) {
                ctx.state.data['warning'] = 'message send fail!'
            }
        }
    },
}
