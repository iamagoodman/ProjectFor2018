const express = require('express');
const fs = require('fs');
module.exports = function () {
    const router = express.Router();
    router.get('/word2html',function (req,res) {
        res.type('html');
        res.render('../static/tools/word2html.html',{});
    })
    router.post('/save',function (req,res) {
        var modalName = req.body.modalName;
        var fileName = req.body.fileName;
        var htmlstr = req.body.htmlstr;
        fs.writeFile(`static/upload/${fileName}.js`,`export const ${modalName} = '${htmlstr}'`, function (err) {
          if (err) {
            console.log(err)
          } else {
            console.log('success')
          }
        });
        res.send({message: 'success', code: 200});
    })
    return router
}
