const express = require('express')
const router = express.Router()
const board = require('./board.routes')
const gallery = require('./gallery.routes')


router.use("/board",gallery)
router.use("/board",board)

module.exports = router