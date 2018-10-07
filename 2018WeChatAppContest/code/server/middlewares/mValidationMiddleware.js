
module.exports = async (ctx, next) => {
    ctx.state.$wxInfo = Object.assign({
        loginState: true,
        userinfo: {
            openId: '213000-10086'
        }
    }, JSON.parse(ctx.request.query.wxInfo))
    await next()
}
