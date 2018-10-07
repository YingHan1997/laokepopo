const {
    mysql
} = require('../qcloud')

const uuid = require('node-uuid')

module.exports = async ctx => {
    var id = uuid.v1()
    // 增
    var book = {
        id: id,
        name: "冰与火之歌",
        price: 88
    }
    await mysql("Book").insert(book)
    // 查
    var res = await mysql("Book").where({
        id
    }).first()
    // 改
    await mysql("Book").update({
        price: 66
    }).where({
        id
    })
    // 删
    await mysql("Book").del().where({
        id
    })
    ctx.state.data = "OK"
}

/*
get: ctx.request.query,
post: ctx.request.body,
*/

/*
increment — .increment(column, amount)
Increments a column value by the specified amount.

knex('accounts')
.where('userid', '=', 1)
.increment('balance', 10)
Outputs:
update `accounts` set `balance` = `balance` + 10 where `userid` = 1
decrement — .decrement(column, amount)
Decrements a column value by the specified amount.

knex('accounts').where('userid', '=', 1).decrement('balance', 5)
Outputs:
update `accounts` set `balance` = `balance` - 5 where `userid` = 1
*/
