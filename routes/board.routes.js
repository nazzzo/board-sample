const express = require('express')
const router = express.Router()
const controller = require('../controllers/board.controller')

router.get('/', controller.getIndex)
router.get('/z-board/list', controller.getList)
router.post('/z-board/list', controller.postList)
router.get('/z-board/write', controller.getWrite)
router.post('/z-board/write', controller.postWrite)
router.get('/z-board/view', controller.getView)
router.get('/z-board/modify', controller.getModify)
router.post('/z-board/modify', controller.postModify)
router.post('/z-board/delete', controller.postDelete)

module.exports = router