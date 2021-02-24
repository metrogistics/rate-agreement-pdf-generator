import { config } from 'dotenv'
config()

import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import json from 'koa-json'
import cors from '@koa/cors'
import { v1 } from './routes'
import { logger } from './middleware'

const app = new Koa()
app.use(bodyParser())
app.use(cors())
app.use(json())

const router = new Router()
router.use(v1.routes())

router.get('/', ctx => {
    ctx.body = { message: "Success" }
})

router.get('/routes', ctx => {
    ctx.body = router.stack.map(i => i.path)
})

app.use(router.routes())

const port = process.env.NODE_PORT || 3000

app.listen(port, () => {
    logger.info(`Server started at http://localhost:${port}`)
})

export {
    app
}
