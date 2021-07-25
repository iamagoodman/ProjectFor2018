const express = require('express');
const common = require('../../libs/common');
const fs = require('fs');
const path = require('path');
module.exports = function () {
    const router = express.Router();
    router.get('/test',function (req,res) {
        res.type('html');
        res.render('./tools/freegive.html',{});
    });
  router.get('/word2html',function (req,res) {
    console.log('aaaaaaaa');
    res.type('html');
    res.render('./tools/word2html.html',{});
  });
  router.get('/music',function (req,res) {
    console.log(__dirname);
    console.log(path);
    const fileName = path.join(__dirname,'iAmYou.mp3');
    fs.readFile(fileName,function (err,data) {
      if (!err) {
        // console.log(data);
        // console.log(res.readAsDataURL(''));
        res.send(data);
      } else {
        console.log(err);
      }
    });
  })






  router.get('/luzhi',function (req,res) {
    res.type('html');
    res.render('./tools/rrwebtest2.html',{});
  });
  router.post('/save',function (req,res) {
      var modalName = req.body.modalName;
      var fileName = req.body.fileName;
      var htmlstr = req.body.htmlstr;
      fs.writeFile(`template/tools/htmlstr/${fileName}.js`,`export const ${modalName} = '${htmlstr}'`, function (err) {
        if (err) {
          console.log(err)
        } else {
          console.log('success')
        }
      })
      console.log(modalName);
      console.log(fileName);
      console.log(htmlstr);
      res.send('ok');
  })
    return router
}
