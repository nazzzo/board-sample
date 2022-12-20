const express = require('express')
const router = express.Router()
const controller = require('../controllers/gallery.controller')

router.get('/', controller.getIndex)
router.get('/gallery/list', controller.getList)
router.post('/gallery/list', controller.postList)
router.get('/gallery/write', controller.getWrite)
router.post('/gallery/write', controller.postWrite)
router.get('/gallery/view', controller.getView)
router.get('/gallery/modify', controller.getModify)
router.post('/gallery/modify', controller.postModify)
router.post('/gallery/delete', controller.postDelete)

module.exports = router