module.exports = (err, ctx) => {
    console.log('err', err)
    console.log('ctx', ctx)
    ctx.status = err.status
    ctx.body = err.body
}