const app = require('./app')

const { APP_PORT } = require('./config/config.default')

app.listen(APP_PORT, () => {
    console.log(`listening 3000 port http://localhost:${APP_PORT}`)
})