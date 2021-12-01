class AboutContorller {
    async detail(ctx, next) {
        ctx.body = '关于我们'
    }
}

module.exports = new AboutContorller()