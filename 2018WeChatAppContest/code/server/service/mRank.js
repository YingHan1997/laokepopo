const { mysql } = require('../qcloud')
const mError = require('../error/mError')

const tableName = 'mRank'

module.exports = {
    rank: async (limit, offest) => {
        const rank_id = (await mysql('mSystem')
            .select('rank_id')
            .where({
                id: 1
            }))[0].rank_id

        const rank = await mysql(tableName)
            .select(tableName + '.point', tableName + '.open_id', 'cSessionInfo.user_info')
            .where({
                rank_id,
            })
            .orderBy(tableName + '.point', 'desc')
            .limit(limit)
            .offset(offest)
            .leftJoin('cSessionInfo', tableName + '.open_id', 'cSessionInfo.open_id')

        return {
            rank_id,
            rank,
        }
    },

    rankInGroup: async (limit, offest) => {
        const rank_id = (await mysql('mSystem')
            .select('rank_id')
            .where({
                id: 1
            }))[0].rank_id

        const rank = await mysql(tableName)
            .select(tableName + '.point', tableName + '.open_id', 'cSessionInfo.user_info')
            .where({
                rank_id,
            })
            .whereIn(tableName + '.open_id', ids)
            .orderBy(tableName + '.point', 'desc')
            .limit(limit)
            .offset(offest)
            .leftJoin('cSessionInfo', tableName + '.open_id', 'cSessionInfo.open_id')

        return {
            rank_id,
            rank,
        }
    },
}
