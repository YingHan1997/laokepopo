const { mysql } = require('../qcloud')
const mError = require('../error/mError')

const tableName = 'mMessage'

module.exports = {
    send: async data => {
        data.has_read = 0
        data.create_time = new Date()
        return await mysql(tableName).insert(data)
    }
}