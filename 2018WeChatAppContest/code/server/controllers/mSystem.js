const { mysql } = require('../qcloud')
const mError = require('../error/mError')

const user_info = {
    "openId": "",
    "nickName": "官方账号",
    "gender": 1,
    "language": "zh_CN",
    "city": "NanJing",
    "province": "Jiangsu",
    "country": "China",
    "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIXHCXRI6jFcxO7WHbhBX1oYsiclwEicJUddBOpBicNHF9k74Lic235O8cpH6W3QibocOibaSKbDWic3AJZQ/132",
    "watermark": {
        "timestamp": 0,
        "appid": ""
    }
}

const tableName = 'mSystem'

module.exports = {
    get: async (ctx, next) => {
        const result = await mysql(tableName)
            .select('*')
            .where({
                id: 1
            })
        delete result[0].id
        delete result[0].password
        ctx.state.data = result[0]
    },

    post: async (ctx, next) => {
        const result = await mysql(tableName)
            .select('*')
            .where({
                id: 1
            })
        ctx.state.data = result[0].password === ctx.state.$data.password
    },

    delete: async (ctx, next) => {
        ctx.state.data = true
    },

    put: async (ctx, next) => {
        const data = ctx.state.$data
        if (data.week_topic_id) {
            const result = await mysql(tableName)
                .update(ctx.state.$data)
                .increment('rank_id', 1)
                .where({
                    id: 1
                })
            ctx.state.data = {
                result,
            }
        } else {
            const result = await mysql(tableName)
                .update(ctx.state.$data)
                .where({
                    id: 1
                })
            ctx.state.data = {
                result,
            }
        }

        if (data.open_id) {
            const res1 = await mysql('cSessionInfo')
                .select('*')
                .where({
                    open_id: data.open_id
                })
            user_info.openId = data.open_id
            if (res1.length > 0) {
                const res2 = await mysql('cSessionInfo')
                    .update({
                        last_visit_time: new Date(),
                        user_info: JSON.stringify(user_info),
                    })
                    .where({
                        open_id: data.open_id
                    })
            } else {
                const res2 = await mysql('cSessionInfo')
                    .insert({
                        open_id: data.open_id,
                        uuid: "",
                        skey: "",
                        create_time: new Date(),
                        last_visit_time: new Date(),
                        session_key: "",
                        user_info: JSON.stringify(user_info),
                    })
            }
        }
    },
}