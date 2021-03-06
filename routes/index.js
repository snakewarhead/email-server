const express = require('express')
const router = express.Router()
const result = require('../libs/result')
const emailUtils = require('../libs/emailUtils')

router.get('/', function (req, res, next) {
  try {
    const data = req.query?.data
    if (!data) {
      res.json(result(1, 'param data empty'))
      return
    }

    let datao
    try {
      datao = JSON.parse(data)
    } catch (e) {
      datao = data
    }

    const subject = datao.subject ?? 'notice'
    const text = datao.text ?? datao
    emailUtils.sendInQueue(subject, text)

    res.json(result(0))
  } catch (e) {
    console.error(e)
    res.json(result(2, 'system error, retry'))
  }
})

module.exports = router
