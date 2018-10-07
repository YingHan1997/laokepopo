/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)

// --- 项目自定义路由 开始 --- //

const mValidationMiddleware = require('../middlewares/mValidationMiddleware')
const mRequestData = require('../middlewares/mRequestData')

function autoMiddlewares(middlewares) {
    return function auto(method, url, controller, ...moreMiddlewares) {
        return router[method](url, ...middlewares, ...moreMiddlewares, controller[method])
    }
}
const withRequestData = autoMiddlewares([mRequestData])

// GET demo
router.get('/demo', controllers.demo)

/// ------------------------ ///

// RESTFULL API
// GET - 查 - url?a=1&b=2
// POST - 增 - url
// DELETE - 删 - url?a=1&b=2
// PUT - 改 - url

const RESTFull = [
    {
        url: '/pool.action', // 话题池 [ok]
        controller: controllers.mPool,
    },
    {
        url: '/topic.action', // 话题 [ok]
        controller: controllers.mTopic,
    },
    {
        url: '/callback.action', // 意见反馈 [ok]
        controller: controllers.mCallback,
    },
    {
        url: '/comment.action', // 评论 [ok]
        controller: controllers.mComment,
    },
    {
        url: '/system.action', // 系统信息 [ok]
        controller: controllers.mSystem,
    },
]
const CRUD = ['post', 'delete', 'put', 'get']

RESTFull.map(value => {
    CRUD.map(method => {
        withRequestData(method, value.url, value.controller)
    })
})

// 话题池详情 [ok]
router.get('/pool_detail.action', mRequestData, controllers.mPool.detail)
router.post('/pool_detail.action', mRequestData, controllers.mPool.detail)
// 话题池点赞 [ok]
router.get('/pool_good.action', mRequestData, controllers.mPool.addGood)
router.post('/pool_good.action', mRequestData, controllers.mPool.addGood)
router.delete('/pool_good.action', mRequestData, controllers.mPool.removeGood)

// 话题详情 [ok]
router.get('/topic_detail.action', mRequestData, controllers.mTopic.detail)

// 评论详情 [ok]
router.get('/comment_detail.action', mRequestData, controllers.mComment.detailGet)
router.post('/comment_detail.action', mRequestData, controllers.mComment.detailPost)
// 评论点赞 [ok]
router.get('/comment_good.action', mRequestData, controllers.mComment.addGood)
router.post('/comment_good.action', mRequestData, controllers.mComment.addGood)
router.delete('/comment_good.action', mRequestData, controllers.mComment.removeGood)
// 评论收藏 [ok]
router.get('/comment_save.action', mRequestData, controllers.mComment.addSave)
router.post('/comment_save.action', mRequestData, controllers.mComment.addSave)
router.delete('/comment_save.action', mRequestData, controllers.mComment.removeSave)

// 排行榜 [ok]
router.get('/rank.action', mRequestData, controllers.mRank.get)

// 我的收藏（收藏的评论） [ok]
router.get('/self_save.action', mRequestData, controllers.mSelf.save)
// 我的话题（发布的话题） [ok]
router.get('/self_topic.action', mRequestData, controllers.mSelf.topic)
// 我的参与（发布的评论） [ok]
router.get('/self_comment.action', mRequestData, controllers.mSelf.comment)

// 消息系统 [ok]
router.post('/self_message.action', mRequestData, controllers.mMessage.post)
router.get('/self_message.action', mRequestData, controllers.mMessage.get)
router.put('/self_message.action', mRequestData, controllers.mMessage.put)

// 切换日话题
router.get('/auto_day.action', controllers.mAuto.day)
// 切换周话题 & 发放奖励
router.get('/auto_week.action', controllers.mAuto.week)

/// ------------------------ ///

// GET 话题
// router.get('/topic.action', controllers.mTopic.get)

// GET 评论 - 分页
// router.get('/comment.action', controllers.mComment.get)

// GET 话题池
// router.get('/pool.action', mRequestData, controllers.mPool.get)
// POST 话题池
//  router.post('/pool.action', mRequestData, controllers.mPool.post)
// DELETE 话题池
// router.delete('/pool.action', mRequestData, controllers.mPool.delete)
// PUT 话题池
// router.put('/pool.action', mRequestData, controllers.mPool.put)

// GET 意见反馈
// router.get('/callback.action', controllers.mCallback.get)

// --- 项目自定义路由 结束 --- //

module.exports = router
