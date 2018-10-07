
module.exports = async (ctx, next) => {
    switch (ctx.request.method) {
        case 'GET':
        case 'DELETE': {
            ctx.state.$data = ctx.request.query
            break
        }
        case 'POST':
        case 'PUT': {
            ctx.state.$data = ctx.request.body
            break
        }
    }
    await next()
    // ctx.state.data['$data'] = ctx.state.$data
}
