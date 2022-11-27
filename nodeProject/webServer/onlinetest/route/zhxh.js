const express = require('express');

module.exports = function () {
    const router = express.Router();
    router.get('/',function (req,res) {
        res.render('../static/zhxh/index.html')
    })
  router.get('/freegive',function (req,res) {
    res.render('../static/zhxh/index.html')
  })
    return router
}
