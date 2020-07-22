const express = require('express');

module.exports = function () {
    const router = express.Router();
    router.get('/',function (req,res) {
        // console.log(req)
        console.log('get')

        let data = {
            name:'frank',
            sex:'f'
        }
        setTimeout(()=>{
            res.send(data).end()
        },3000)
    })
    router.post('/',function (req,res) {
        console.log('post')
        let data = {
            name:'frank',
            sex:'f'
        }

        // console.log(req)
        setTimeout(()=>{
            res.send(data).end()
        },3000)
    })
    return router
}