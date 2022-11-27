const express = require('express');
const common = require('../../libs/common');
const fs = require('fs');
const path = require('path');
module.exports = function () {
  const router = express.Router();
  router.post('/save', function (req, res) {
    console.log(
      '---log---',
      new Buffer.from(req.body.data, 'base64').toString()
    );
    console.log(req.body);
    res.send('ok');
  });
  return router;
};
