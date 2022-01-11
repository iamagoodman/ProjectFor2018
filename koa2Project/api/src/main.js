const app = require('./app')
// main.js
const { APP_PORT } = require('./config/config.default')

app.listen(APP_PORT, () => {
    console.log(`listening ${APP_PORT} port http://localhost:${APP_PORT}`)
})