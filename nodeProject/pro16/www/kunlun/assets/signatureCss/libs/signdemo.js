$(document).ready(function() {
  // initAnySign(112321321);
  // setTemplateData();
  //testPopupDialog(20);
  // testPopupDialog(Number(signInitParams.personInfo.contextID));
  //document.getElementById("sign_title").innerHTML=signInitParams.personInfo.title;

  // const testSignInitParams = testSignInitParamsss;


  // initParams(testSignInitParams);
  // document.addEventListener('message', function(msg) {
  //     //alert(msg.data);
  //     var data = JSON.parse(msg.data);
  //     var id = Number(data.id);
  //     if(id === 1){
  //         initParams(data);
  //     } else if(id === 20 || id === 21 || id === 22){
  //         testPopupDialog(id);
  //     } else if(id === 30){
  //         testCommentDialog(id)
  //     } else if(id === 100){
  //         genData()
  //     } else if(id === 1000){
  //         resetAnySign(data.data)
  //     }
  //
  //
  // });
});



document.onreadystatechange = setAlertTitle;

var apiInstance;
var fileData;
var ocrCapture;
var signInitParams = {};
var showfn;
var DATA_CANNOT_PARSED = '10003'; //输入数据项无法解析
var SERVICE_SYSTEM_EXCEPTION = '10011'; //服务系统异常错误
var RECOGNITION_RESULT_EMPTY = '10100'; //识别结果为空
var CONNECTION_SERVICE_TIMEOUT = '10101'; //连接识别服务超时
var CONNECTION_RECOGNITION_EXCEPTION = '10102'; //连接识别服务异常
var SUCCESS = '0'; //识别成功
var RECOGNITION_FALSE = '-1';//识别错误
var RESULT_OK = 0; //操作成功
var CALLBACK_TYPE_SIGNATURE = 10; //签名框点击确认之后的回调，回调中包含签名快照
var CALLBACK_TYPE_DIALOG_CANCEL = 11; //点击签名框"取消"按钮时的回调，同时也会触发dismiss回调
var CALLBACK_TYPE_COMMENTSIGN = 12; //批注签名框点击确认之后的回调，回调中包含签名快照
var CALLBACK_TYPE_GETVERSION = 13; //获得版本号
var messageToRN = {
  image20: '',  //被保险人签名
  image22: '',  //投保人签名
  image30: '',  //提示语
  storeData: '', //保存的配置数据
  uploadDataGram: '' //加密串
}


function initParams(data,show) {
  console.log(data)
  signInitParams = data;
  initAnySign();
  setTemplateData();
  showfn = show;
}

function initSign(contextID){
  if(contextID === 21 || contextID === 20){
    testPopupDialog(contextID);
  }else if(contextID === 30){
    testCommentDialog(30)
  }
}

function setAlertTitle() {
  // document.title = '微信在线出单';
}


//配置模板数据
function setTemplateData() {

  // var formData = "{\"bjcaxssrequest\":{\"submitinfo\":[{\"username\":\"测星雨\",\"identitycardnbr\":\"320902198901191012\"},{\"username\":\"测星雨123\",\"identitycardnbr\": \"320902198901191012\"}]}}";

  var data = 'PGh0bWw+PGhlYWQ+PHRpdGxlPjwvdGl0bGU+PG1ldGEgaHR0cC1lcXVpdj0nQ29udGVudC1UeXBlJyBjb250ZW50PSd0ZXh0L2h0bWw7IGNoYXJzZXQ9VVRGLTgnIC8+PC9oZWFkPjxib2R5PjxkaXY+PGRpdj48bGFiZWw+a2V5d29yZDo8L2xhYmVsPjwvZGl2PjxkaXY+PGxhYmVsPuWIl+WQjTLvvJo8L2xhYmVsPjwvZGl2PjxkaXY+PGxhYmVsPuWIl+WQjTPvvJo8L2xhYmVsPjwvZGl2PjwvZGl2PjwvYm9keT48L2h0bWw+';
  var formData = Base64.encode(data);
  //文件数据
//  		   var formData = fileData;
  var businessId = signInitParams.signInfo.businessID;//集成信手书业务的唯一标识

  // alert(businessId + '123');


  var template_serial = '4000';//用于生成PDF的模板ID


  var res;

  res = apiInstance.setTemplate(TemplateType.PDF, formData, businessId, template_serial);

  if (!res) {
    alert('setTemplateData error');
    return res;
  }

}

//选择文件
function handleFiles(files) {
  if (files.length) {
    var file = files[0];
    var reader = new FileReader();

    reader.onload = function FileReaderOnload() {
      var buffer = reader.result;
      var uint8Array = new Uint8Array(reader.result);
      var bufStr = '';
      var bufarray = Base64.encodeUint8Array(uint8Array);
      bufStr = bufarray;
      fileData = bufStr;
    };
    reader.readAsArrayBuffer(file);
  }
}

//添加单签签名框
function addSignatureObj(objId) {
console.log(objId);
  var context_id = objId;
  var signer = new Signer(signInitParams.personInfo.signName, signInitParams.personInfo.signID);

  console.log(signer);

  //var signerRule = new SignRule_KeyWordV2('Policyholder Signature',100,-5,3,1);
  var signerRule = new SignRule_KeyWord('TBRQMC',1,0,1,1);
  if(objId==20){
    signerRule = new SignRule_KeyWord('TBRQ',1,0,1,1);   //孙阳最近修改
  }else if(objId==21) {
    signerRule = new SignRule_KeyWord('BBRQ',1,0,1,1);
  }else if(objId==22) {
    signerRule = new SignRule_KeyWord('YXYQ',1,0,1,1);
  }else if(objId==24){
    signerRule = new SignRule_KeyWord('TBRQMC',1,0,1,1);
  }
  else if(objId==29) {
    signerRule = new SignRule_KeyWord('WNXQ',1,0,1,1);
  }else if(objId>200){
    signerRule = new SignRule_KeyWord('BBRQ'+(objId-200),1,0,1,1);
  }
  var signatureConfig = new SignatureConfig(signer, signerRule);
//                   1:时间在上、2：时间在下、3：时间在右
//  var timeTag = new TimeTag(1, 'yyMMdd hh:mm;ss');
 // signatureConfig.timeTag = timeTag;
  signatureConfig.singleWidth = 120;
  signatureConfig.singleHeight = 120;
  signatureConfig.title = signInitParams.personInfo.title;
  signatureConfig.titleSpanFromOffset = 4;
  signatureConfig.titleSpanToOffset = 3 + signInitParams.personInfo.signName.length//当为普通签名时有效，表示title中需要放大显示字体的数组结束index
  signatureConfig.penColor = '#000';
  signatureConfig.isTSS = false;//是否开始时间戳服务
  signatureConfig.signatureImgRatio = 3.0;
  signatureConfig.nessesary = true;
  signatureConfig.isdistinguish = false;
  signatureConfig.ocrCapture = ocrCapture;


  var res = apiInstance.addSignatureObj(context_id, signatureConfig);
  if (!res) {
    alert('addSignatureObj ' + context_id + ' error');
  }

  return res;

}


//添加批签签名框
function testAddCommentObj(objId,obj) {

  var context_id = objId;
  var signer = new Signer(obj.signName, obj.signID);

  /**
   * 根据坐标定位签名方式
   * @param left 签名图片最左边坐标值，相对于PDF当页最左下角(0,0)点，向上和向右分别为X轴、Y轴正方向
   * @param top 签名图片顶边坐标值，相对于PDF当页最左下角(0,0)点，向上和向右分别为X轴、Y轴正方向
   * @param right 签名图片最右边坐标值，相对于PDF当页最左下角(0,0)点，向上和向右分别为X轴、Y轴正方向
   * @param bottom 签名图片底边坐标值，相对于PDF当页最左下角(0,0)点，向上和向右分别为X轴、Y轴正方向
   * @param pageNo 签名在PDF中的页码，从1开始
   * @param unit 坐标系单位，目前支持"dp"和"pt"
   * @constructor
   */
  // var signerRule = new SignRule_XYZ(84.0, 523.0, 150.0, 477.0, 2, 'dp');
  var signerRule = new SignRule_KeyWord('CLX',4,0,1,3);

  var commentConfig = new CommentConfig(signer, signerRule);
  commentConfig.commitment = obj.signWords;
  commentConfig.mass_word_height = 50;
  commentConfig.mass_word_width = 50;
  commentConfig.mass_words_in_single_line = 15;
  commentConfig.penColor = '#000';
  commentConfig.nessesary = false;
  commentConfig.isdistinguish = false;
  commentConfig.isShowBgText = true;
  commentConfig.currentEditBarTextColor = '#000';
  commentConfig.ocrCapture = ocrCapture;
  var res = apiInstance.addCommentObj(context_id, commentConfig);
  if (res) {
    //alert("addCommentObj "+context_id+" success");
    return res;
  }
  else {
    alert('addCommentObj ' + context_id + ' error');
    return res;
  }
}



var callback = function(context_id, context_type, val) {
  var dataKey=genData();
  showfn && showfn(context_id,val,dataKey);
  // document.getElementById("other").style.display = "block";
  if(!val){
    // window.postMessage('000');
  }
// this.show.call(this)
  if (context_type == CALLBACK_TYPE_SIGNATURE && context_id == 20) {
    messageToRN.image20 = val;
    // window.postMessage(JSON.stringify(val));
    //签名回显
    document.getElementById('xss_20').src = 'data:image/png;base64,' + val;
    sessionStorage.setItem('show20',20)
    var person=signInitParams.personInfo;
    if(person.Declaration){
      testCommentDialog('30');
    }
    // var aImg = document.getElementById('xss_20');
    // for (var i = 0; i < aImg.length; i++) {
    //   aImg[i].style.height = '500';
    //   aImg[i].style.width = '500';
    // }
  }
  else if (context_type == CALLBACK_TYPE_SIGNATURE && context_id == 22) {
    //签名回显
    // window.postMessage(val);
    document.getElementById('xss_22').src = 'data:image/png;base64,' + val;
    sessionStorage.setItem('show22',22)
    // var aImg = document.getElementById('xss_22');
    // for (var i = 0; i < aImg.length; i++) {
    //   aImg[i].style.height = '1500';
    //   aImg[i].style.width = '1500';
    // }
  }
  else if (context_type == CALLBACK_TYPE_SIGNATURE && context_id == 29) {
    //签名回显
    document.getElementById('xss_29').src = 'data:image/png;base64,' + val;
    sessionStorage.setItem('show29',29)
  }
  else if (context_type == CALLBACK_TYPE_SIGNATURE && context_id == 21) {
    //签名回显
    document.getElementById('xss_21').src = 'data:image/png;base64,' + val;
    sessionStorage.setItem('show21',21)
    // var aImg = document.getElementById('xss_21');
    // for (var i = 0; i < aImg.length; i++) {
    //   aImg[i].style.height = '1500';
    //   aImg[i].style.width = '1500';
    // }

  }else if (context_type == 10 && context_id == 30) {
    //签名回显
    document.getElementById('xss_30').src = 'data:image/png;base64,' + val;
    sessionStorage.setItem('show30',30)
    // var aImg = document.getElementById('xss_21');
    // for (var i = 0; i < aImg.length; i++) {
    //   aImg[i].style.height = '1500';
    //   aImg[i].style.width = '1500';
    // }

  }
  else if (context_type == CALLBACK_TYPE_SIGNATURE && context_id == 24) {
    //签名回显
    document.getElementById('xss_1').src = 'data:image/png;base64,' + val;
    sessionStorage.setItem('show1',1)
    // var aImg = document.getElementById('xss_21');
    // for (var i = 0; i < aImg.length; i++) {
    //   aImg[i].style.height = '1500';
    //   aImg[i].style.width = '1500';
    // }

  }


  setAlertTitle();
  //alert('收到浏览器回调：' + 'context_id：' + context_id + ' context_type：' + context_type + ' value：' + val);
};//测试回调，将回调数据显示

//demo总入口
function initAnySign() {
  var res;

  //识别回调接口
  var identify_callback = function(errCode) {
    if (errCode == SUCCESS) {
      return;
    }
    if (errCode == DATA_CANNOT_PARSED) {
      alert('输入数据项无法解析！');
    } else if (errCode == SERVICE_SYSTEM_EXCEPTION) {
      alert('服务系统异常错误！');
    } else if (errCode == RECOGNITION_RESULT_EMPTY) {
      alert('识别结果为空！');
    } else if (errCode == CONNECTION_SERVICE_TIMEOUT) {
      alert('连接识别服务超时！');
    } else if (errCode == CONNECTION_RECOGNITION_EXCEPTION) {
      alert('连接识别服务异常！');
    } else if (errCode == RECOGNITION_FALSE) {
      alert('书写错误！');
    } else {
      alert(errCode);
    }
  };

  ////////////////////////////////////////////////

  //设置签名算法，默认为RSA，可以设置成SM2
  EncAlgType.EncAlg = 'RSA';

  apiInstance = new AnySignApi();
  var channel = "10010";//渠道号，由信手书提供，请咨询项目经理
  //初始化签名接口
  res = apiInstance.initAnySignApi(callback, channel);

  if (!res) {
    alert('init error');
  } else {

  }
  ////////////////////////////////////////////////

  //开启识别
  ocrCapture = new OCRCapture();
  ocrCapture.text = 'a';
  ocrCapture.IPAdress = 'http://60.247.77.116:11203/HWR/RecvServlet';
  ocrCapture.appID = '123';
  ocrCapture.count = 5;
  ocrCapture.language = Language.CHS;
  ocrCapture.resolution = 80;
  ocrCapture.serviceID = '999999';

  setIdentifyCallBack(identify_callback);

  ///////////////////////////////////////////////

  //signInitParams.personInfo.forEach((person,index)=>{
    //alert(person.contextID);
  var person=signInitParams.personInfo;
  res = addSignatureObj(person.contextID);
  if (!res) {
    alert('addSignatureObj error' + person.contextID);
  }
  if(person.Declaration){
    res = testAddCommentObj('30',person.Declaration);
    if (!res) {
      alert('testAddCommentObj error');
    }
  }
  // else{
  //   res = addSignatureObj(person.contextID);
  // }
  //});


  ////////////////////////////////////////////////

  //注册一个单位签章

  //var signer = new Signer('小明', '110xxxxxx');
  /**
   * 使用服务器规则配置签名
   * @param tid 服务器端生成的配置规则
   * @constructor
   */
  // var signerRule = new SignRule_Tid('111');
  // var cachet_config = new CachetConfig(signer, signerRule, false);

  // res = apiInstance.addCachetObj(cachet_config);
  ////////////////////////////////////////////////

  // if (!res) {
  //     alert('addCachetObj error');
  // } else {
  //
  // }
  ////////////////////////////////////////////////

  //将配置提交
  res = apiInstance.commitConfig();

  if (!res) {
    alert('Init ALL 初始化失败');
  }

  ////////////////////////////////////////////////

}

function resetAnySign(data) {
  res = apiInstance.resetConfig();

  if (!res) {
    alert('resetAnySign 重置失败');
  }
  signInitParams = data;

  //signInitParams.personInfo.forEach((person,index)=>{
    //alert(person.contextID);
  var person=signInitParams.personInfo;
    res = addSignatureObj(person.contextID);
    if (!res) {
      alert('addSignatureObj error' + person.contextID);
    }
    if(person.Declaration){
      res = testAddCommentObj(30,person.Declaration);
      if (!res) {
        alert('testAddCommentObj error');
      }
    }
 // });

  res = apiInstance.commitConfig();

  if (!res) {
    alert('Init ALL 初始化失败');
  }
}


function testIsReadyToUpload() {
  alert('testIsReadyToUpload :' + apiInstance.isReadyToUpload());
}

//生成签名加密数据
function genData() {
  //var res = document.getElementById('result');
  //alert('genvalue');
  try {
    var dataGram = apiInstance.getUploadDataGram();
    // window.postMessage(dataGram);
    //res.value = dataGram;
    //alert('value' + dataGram);
    return dataGram;
  }
  catch (err) {
    alert(err);
  }
}

//弹出签名框签名
function testPopupDialog(context_id) {
  if (!apiInstance) {
    alert('信手书接口没有初始化');
    return;
  }
  switch (apiInstance.showSignatureDialog(context_id)) {
    case RESULT_OK:
      //document.getElementById("other").style.display = "none";
      break;
    case EC_API_NOT_INITED:
      alert('信手书接口没有初始化');
      break;
    case EC_WRONG_CONTEXT_ID:
      alert('没有配置相应context_id的签字对象');
      break;
  }
}

function setIdentifyCallBack(callback) {
  if (!apiInstance) {
    alert('信手书接口没有初始化');
    return;
  }
  apiInstance.setIdentifyCallBack(callback);
}

//弹出批注签名框
function testCommentDialog(context_id) {
  if (!apiInstance) {
    alert('信手书接口没有初始化');
    return;
  }
  switch (apiInstance.showCommentDialog(context_id)) {
    case RESULT_OK:
      //document.getElementById("other").style.display = "none";
      break;
    case EC_API_NOT_INITED:
      alert('信手书接口没有初始化');
      break;
    case EC_WRONG_CONTEXT_ID:
      alert('没有配置相应context_id的签字对象');
      break;
    case EC_COMMENT_ALREADY_SHOW:
      alert('批注签名框已弹出，请勿重复操作！');
  }

}

//获取签名api版本信息
function testGetVersion() {
  alert(apiInstance.getVersion());
}

//获取设备操作系统信息
function testGetOsInfo() {
  alert(apiInstance.getOSInfo());
  alert(navigator.userAgent);
  alert(window.__wxjs_is_wkwebview);
}


function saveBusiness(){

  var encKey = "334324afa";
  var encData = apiInstance.saveBusiness(encKey);

  var res = document.getElementById('result');
  res.value = encData;

}

function restoreBusiness() {

  var apiInstance = new AnySignApi();

  //初始化签名接口
  res = apiInstance.initAnySignApi(callback, "1243");

  if (!res) {
    alert("init error");
  } else {
    alert("init success");
  }

  var encData = document.getElementById('result').value;
  var desKey = "334324afa";
  var res = apiInstance.restoreBusiness(encData, desKey);


  if (res) {
    alert("恢复数据成功");
  } else {
    alert("恢复数据失败");
  }
}
