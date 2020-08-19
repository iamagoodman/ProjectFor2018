const express = require('express');

module.exports = function () {
    const router = express.Router();
    router.get('/',function (req,res) {
        //console.log(req)
        console.log('fdsafsadfsdfsa');
        console.log('get')

        let data = {
            success:'Y',
            message:'data save success'
        }
        res.send(data).end()
    
    })
    router.post('/',function (req,res) {
        console.log('post')
        let data = {
            success:'Y',
            message:'data save success'
        }
        console.log(req.host)
        console.log(req.body)
        // console.log(req)
        res.send(data).end()
    })
    return router
}