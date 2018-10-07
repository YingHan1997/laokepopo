const { mysql } = require('../qcloud')
const mError = require('../error/mError')

const tableName = 'mTopic'

module.exports = {
    insert: async data => {
        return await mysql(tableName).insert(data)
    }
}