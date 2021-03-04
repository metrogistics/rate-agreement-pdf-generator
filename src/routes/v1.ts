import Router from 'koa-router'
import { firstController, pdfController } from '../controllers'
const router = new Router({
    prefix: '/v1',
    sensitive: false,
})

router.get('/example/:id', firstController.getOne)
router.get('/example', firstController.getMany)
// router.get('/pdf-example/:load', pdfController.generatePdf)

export default router


