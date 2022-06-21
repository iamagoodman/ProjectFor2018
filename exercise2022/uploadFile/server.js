const express = require('express');
const pathLib = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');
const multerObj = multer({ dest: './upload' });

var server = express();

server.listen(8090);
server.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  if (req.url.indexOf('favicon.ico') != -1) return;
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Headers', 'content-type');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('X-Powered-By', '3.2.1');
  res.header('Content-Type', 'application/json;charset=utf-8');
  res.header('allowCredentials', true);
  next();
});
server.use(bodyParser.json({ limit: '100mb' }));
server.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
server.use(multerObj.any());

server.post('/upload', function (req, res) {
  // console.log(req.files);
  const files = req.files;
  for (var i = 0; i < files.length; i++) {
    const file = files[i];
    var newName = file.path + pathLib.parse(file.originalname).ext;
    fs.rename(file.path, newName, function (err) {
      if (!err && i == files.length) {
        res.send('success');
      }
    });
  }
});
server.post('/uploadBase64', function (req, res) {
  console.log(req.body.fileName);
  res.send('成功');
});
