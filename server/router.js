const Router = require('express')
const router = new Router()
const controller = require('./controller')


router.post('/create', controller.create)
router.post('/delete', controller.delete)
router.post('/done', controller.done)
router.post('/refactor', controller.refactor)
router.get('/', controller.getAll)

module.exports = router
