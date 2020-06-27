// 用于文件上传
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

var objMulter = multer();

var server = express();
server.listen(8080);

// server.use(bodyParser.urlencoded({extended:false}));
server.use(objMulter.any())
server.post('/',function (req,res) {
    console.log(req.body);
    console.log(req.files);
})

