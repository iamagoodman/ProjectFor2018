module.exports = (err, ctx) => {
    console.log('err', err)
    ctx.status = err.status
    ctx.body = err.body
}