const express = require('express');

module.exports = function () {
  const router = express.Router();
  router.get('/', function (req, res) {
    console.log(req.query);
    console.log('get');
    let data = {
      success: 'Y',
      message: 'data save success'
    };
    res.send(data).end();
  });
  router.post('/', function (req, res) {
    console.log('post');
    console.log(req.body);
    let data = {
      success: 'Y',
      message: 'data save success'
    };
    let data2 = {
      data: {
        orderId: 'orderId',
        policyNo: 'policyNo',
        policyUrl: 'https://www.baidu.com/',
        productName: '华泰医疗保险',
        proposalNo: 'proposalNo',
        totalPremium: 'totalPremium'
      },
      reasonCode: '10200',
      reasonDesc: '成功',
      success: true,
      totalCount: null
    };
    res.send(data2).end();
  });
  return router;
};
