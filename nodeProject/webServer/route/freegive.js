const express = require('express');
module.exports = function () {
    const router = express.Router();
    router.get('/',function (req,res) {
        res.type('html');
        res.render('./tools/freegive.html',{});
    });
    return router
}
