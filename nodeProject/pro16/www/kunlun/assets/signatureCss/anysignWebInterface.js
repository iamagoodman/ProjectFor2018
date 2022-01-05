/**
 * Created by fengbo on 14-7-4.
 */


var core;

function AnySignApi()
{
	//constants
	this.CALLBACK_TYPE_SIGNATURE = 1;//签名框点击确认之后的回调，回调中包含签名快照
	this.CALLBACK_TYPE_DIALOG_DISMISS = 2;//签名框dismiss时的回调
	this.CALLBACK_TYPE_DIALOG_CANCEL = 3;//点击签名框"取消"按钮时的回调，同时也会触发dismiss回调
	this.CALLBACK_TYPE_BUFFER_SAVED = 4;//签名数据缓存成功的回调，目前未用到此功能
	this.CALLBACK_TYPE_ON_PICTURE_TAKEN = 5;//拍照成功回调，回调中包含照片快照
	this.CALLBACK_TYPE_DATA_DELETED = 6;//成功删除数据回调

	this.CALLBACK_TYPE_START_RECORDING = 7;//开始多媒体记录回调
	this.CALLBACK_TYPE_STOP_RECORDING = 8;//结束多媒体记录回调
	this.CALLBACK_TYPE_ON_MEDIA_DATA = 9;//多媒体数据处理完毕，回传给js的回调，回调函数的data参数为多媒体数据

	this.CALLBACK_TYPE_COMMENTSIGN = 10;//批注签名框点击确认之后的回调，回调中包含签名快照

	this.CALLBACK_TYPE_ERROR = -1;//发生错误时的回调，错误信息如以下EC_XXX定义
	this.CALLBACK_TYPE_ERROR_PICTURE = -2;//在处理照片时发生异常，具体信息见value字段
	this.CALLBACK_TYPE_OPERATION_CANCELED = -3;//用户取消操作，如取消拍照

	this.CALLBACK_TYPE_GETVERSION = 10;//获得版本号
	//functions return value
	this.RESULT_OK = 0;//操作成功
	this.RESULT_ERROR = -1;//操作失败
	this.EC_API_NOT_INITED = 1;//接口未初始化错误
	this.EC_WRONG_CONTEXT_ID = 2;//context_id传值错误
	this.EC_CAMERA_INIT_FAILED = 3;//摄像头初始化失败，通常重启设备可以解决
	this.EC_NATIVE_EXCEPTION = 4;//浏览器内部错误，可至Android/sdcard/AnySign/lastCrash.txt中查询具体错误
	this.EC_DEVICE_NOT_SUPPORTED = 5;//当前设备不被浏览器支持，只能调用浏览器功能，信手书模块功能禁用
    this.EC_TEMPLATE_NOT_SET = 6;//当没有配置模板时试图调用签名时弹出，因为不能对空数据做签名

	/**
	 * 初始化签名对象，通常从打开客户端到关闭客户端，中间只需要初始化一次。
	 * 要求回调函数至少有3个参数，参数定义如下面callback参数定义
	 * @param callback Function with 3 params(int context_id, int callback_type, String data)
	 * @param channel Function with 3 params(int context_id, int callback_type, String data)
	 * @returns {boolean} 是否初始化成功以及是否回调函数参数满足要求
	 */
	this.initAnySignApi = function(callback,channel)
	{
		if(callback && (callback instanceof Function) && callback.length >= 3)
		{
            core = new anysignWebImpl();
            core._initAnySignApi(callback, channel);
			return true;
		}
		else
		{
			return false;
		}
	}

    this.addDataObj = function(context_id, dataConfig)
    {
        if(!dataConfig instanceof DataConfig)
        {
            return false;
        }

        return core._addDataObj(context_id, dataConfig);
    }

//  /**
//   * 添加识别参数
//   */
//  this.startOCR = function(ocrCapture)
//  {
//  	return core._startOCR(ocrCapture);
//  }

	/**
	 * 配置一个签名，context_id区间为[20,30)&[200,300)，20~29为普通签名，30~39为多字批示。
	 * 根据signatureConfig配置签字相应属性。
	 * @param context_id 签字对象唯一标识
	 * @param signatureConfig 签字配置信息
	 * @returns {boolean}
	 */
	this.addSignatureObj = function(context_id, signatureConfig)
	{
		if(!signatureConfig instanceof SignatureConfig)
			return false;

        return core._addSignatureObj(context_id, signatureConfig);
	}


    /**
     * 配置一个批注签名，context_id区间为[30,40)，[300,400),20~29为普通签名，30~39为多字批示。
     * 根据signatureConfig配置签字相应属性。
     * @param context_id 签字对象唯一标识
     * @param signatureConfig 签字配置信息
     * @returns {boolean}
     */
    this.addCommentObj = function(context_id, signatureConfig)
    {
        if(!signatureConfig instanceof SignatureConfig)
            return false;

        return core._addCommentObj(context_id, signatureConfig);
    }



	/**

	*jane

	*/

	this.addEvidence = function(context_id, content, format, bioType,index)

	{

		return core._addEvidence(context_id, content, format, bioType,index);

	}

	/**
	 * 添加证据hash值
	 * content：为Hash计算之后的值
	 */
	this.addEvidenceHash = function(context_id, content, format, bioType,index)
	{
		return core._addEvidenceHash(context_id, content, format, bioType,index);
	}


	/**
	 * 配置一个公司签章
	 * @param signatureConfig 公司签章对象
	 * @returns {boolean}
	 */
	this.addCachetObj = function(cachetConfig)
	{
        if(!(cachetConfig instanceof CachetConfig))
        {
            return false;
        }

		return core._addChachetObj(cachetConfig);
	}

//	/**
//	 * 暂未实现
//	 * 配置一个拍照对象，在#commitConfig()之前可以调用，context_id区间为[50,1000)
//	 * @param context_ids 对象id数组，适用于多个相同配置的签字对象
//	 * @param photoConfig 照片的配置信息
//	 * @returns {boolean} 是否添加成功：true：成功；false：配置文件格式错误、context_ids不是数组或者长度为0
//	 */
//	this.addPhotoObj = function(context_id, photoConfig)
//	{
//		if(!(photoConfig instanceof PhotoConfig))
//			return false;
//
//		return true;
//	}
//
//	/**
//	 * 暂未实现
//	 * 配置一个多媒体对象，在#commitConfig()之前可以调用，context_id区间为[50,1000)
//	 * @param context_ids 对象id数组，适用于多个相同配置的签字对象
//	 * @param mediaConfig 多媒体的配置信息
//	 * @returns {boolean} 是否添加成功：true：成功；false：配置文件格式错误、context_ids不是数组或者长度为0
//	 */
//	this.addMediaObj = function(context_id, mediaConfig)
//	{
//		if(!(mediaConfig instanceof MediaConfig))
//			return false;
//
//		return true;
//	}

	/**
	 * 设置表单数据，每次业务都需要set一次
	 * @param template_type 签名所用的模板id, 即context id
	 * @param contentUtf8Str 表单数据，类型为Utf8字符串
	 * @param template_serial 模板序列号
	 * @param businessId 业务工单号
	 * @returns {*} 是否设置成功
	 */
	this.setTemplate = function(template_type, contentUtf8Str,businessId,template_serial)
	{
		if(core)
			return core._setTemplate(template_type, contentUtf8Str, businessId, template_serial);
		else
			return false;
	}

    this.setTID = function(tid)
    {
        return core._setTID(tid);
    }

    /**
     *
     * @param context_id
     * @param data utf8字符串或者uint8Array数组
     * @returns {*} 是否设置成功
     */
    this.setData = function(context_id, data)
    {
        return core._setData(context_id, data);
    }

	/**
	 * 弹出根据context_id区分的普通、批示签名
	 * @param context_id
	 * @return 是否成功弹出：成功：0 错误：相应EC错误码定义
	 */
	this.showSignatureDialog = function(context_id)
	{
		return core._showSignatureDialog(context_id);
	}

    /**
     * 弹出根据context_id区分的普通、批示签名
     * @param context_id
     * @return 是否成功弹出：成功：0 错误：相应EC错误码定义
     */
    this.showCommentDialog = function(context_id)
    {
        return core._showCommentDialog(context_id);
    }

    this.setIdentifyCallBack = function(callBack){
    	return core._setIdentifyCallBack(callBack);
    }

//	/**
//	 * 根据context_id，对指定对象做拍照请求
//	 * @param context_id
//	 * return int
//	 */
//	this.takePicture = function(context_id)
//	{
//		return false;
//	}
//
//	/**
//	 * 根据context_id，对指定对象开始做视频、音频录制等
//	 * @param context_id
//	 * return int
//	 */
//	this.startMediaRecording = function(context_id)
//	{
//		return false;
//	}
//
//	/**
//	 * 结束指定多媒体录制，结果将通过回调返回
//	 * @param context_id
//	 * return int
//	 */
//	this.finishMediaRecording = function(context_id)
//	{
//		return false;
//	}


	/**
	 * 提交更改，一旦调用，在本次签名流程中不允许再设置表单数据(setTableData)和签名、拍照配置等信息
	 */
	this.commitConfig = function()
	{
        return core._commitConfig();
	}

	/**
	 * 重新配置Api，调用之后可以设置表单数据(setTableData)和签名、拍照配置等信息
	 * 注：前一次业务的签名、拍照等数据会被清空
	 */
	this.resetConfig = function()
	{
		return core._resetConfig();
	}


	/**
	 * 一次业务完成(签名、拍照均做完)后，调用此接口判断上传诗句是否准备就绪
	 * @return ture false
	 */
	this.isReadyToUpload = function()
	{
		return core._isReadyToUpload();
	}


	/**
	 * 一次业务完成(签名、拍照均做完)后，调用此接口获取须上传至信手书服务器的业务加密数据
	 * @return 加密的业务数据。如果
	 */
	this.getUploadDataGram = function()
	{
		return core._getUploadDataGram();
	}

    /**
     * add by han 20151217
     * 保存当前的数据
     * @return 加密的业务数据。
     */
    this.saveBusiness = function(encKey)
    {
        return core._saveBusinessSession(encKey);
    }
    /**
     * add by han 20151217
     * 恢复之前保存的加密业务数据
     */
    this.restoreBusiness = function(encData, desKey)
    {
        return core._restoreBusinessSession(encData, desKey);
    }

//  /**
//   * 保存当前的数据
//   * @return 加密的业务数据。
//   */
//  this.getUploadDataGram = function()
//  {
//      return core._getUploadDataGram();
//  }

	/**
	 * 获得版本信息
	 * @param null
	 * @returns null
	 */
	this.getVersion = function()
	{
		return "AnySign_V1.3.3_Web_2.3.3";
	}

    /**
     * 获取操作系统信息，格式为"操作系统名##版本号"，如"android##4.1.2"、"ios##7.1.2"
     * @returns {*}
     */
    this.getOSInfo = function()
    {
        return core._getOSInfo();
    }
}

    /**
     * 信手书数据容器，用于存放证据信息等数据
     * @constructor
     */
    function DataConfig()
    {
        this.cid = 0;
        this.name = null;//此数据项的名称
        this.format = null;
        this.nessesary = true;//此DataObj是否为必须，即如果此DataObj数据为空，当nessesary为true时，getEncodedSignData会报错返空，isReadyToUpload返回false
    }

/**
 * 拍照配置对象，用于为此次签名事务添加一个拍照
 * @constructor
 */
//function PhotoConfig()
//{
//    this.cid = 0;
//    this.width = 640;//int px
//    this.height = 480;//int px
//    this.median = false;//bool 二值化过滤是否开启，启用二值化，图片尺寸会显著降低，但在某些光照不充足条件下中值取值会不准确
//    this.mono = true;//bool 黑白过滤是否开启，当median为true时，此选项无效
//    this.quality = 85//int 0~100 推荐85
//    this.openFromGallery = false;//是否从相册选择照片
//    this.applyConfigOnGalleryPic = true;//当openFromGallery为true时有效。表示是否将width等配置信息应用于画廊图片。如为false，则使用画廊原始图片
//    this.encodeToDataGram = true;//是否将数据添加到加密数据包中
//}

/*function MediaConfig()
 {
 this.cid = 0;
 this.mediaType = "audio";//支持类型：audio、video
 this.mediaFormat = "wav";//支持类型：mpeg4、3gp、wav
 this.duration = 10;//时长，单位：秒
 this.useBuiltInUI = true;
 this.encodeToDataGram = true;//是否将数据添加到加密数据包中
 }*/


 /**
 * 签名配置，配合AnySignApi实例的addSignatureObj函数为此次签名事务添加一个签名
 * @param signer 签名人，参考Signer定义
 * @param signRule 签名规则，参考SignRule_Tid等SignRule定义
 * @constructor
 */
function SignatureConfig(signer, signRule)
{
    if(!signer || !signRule)
    {
        throw "SignatureConfig constructor parameter signer or signRule could not be null.";
    }

    if(!(signRule instanceof SignRule_KeyWord) && !(signRule instanceof SignRule_Tid) && !(signRule instanceof SignRule_XYZ)
        && !(signRule instanceof SignRule_KeyWordV2) && !(signRule instanceof SignRule_KeyWordV3))
    {
        throw  "SignatureConfig constructor parameter signRule invalid, should be instance of SignRule_KeyWord or SignRule_Tid or SignRule_XYZ";
    }

    this.signer = signer;//签名人信息，为必填项

    this.signRule = signRule;//签名放置到文档中的规则，如位置，大小等，为必填项

   // this.title = "本人已阅读保险条款、产品说明书和投保提示书，了解本产品的特点和保单利益的不确定性。";//批示输入有效，批示内容
    this.cid = 0;
    this.title = "请投保人刘伟签名";//签字输入有效，签字框标题
    this.titleSpanFromOffset = 4;//当为普通签名时有效，表示title中需要放大显示字体的数组起始index
    this.titleSpanToOffset = 5;//当为普通签名时有效，表示title中需要放大显示字体的数组结束index

    this.isTSS = false;
    this.nessesary = false;//是否为必签项
//    this.dlgXoffset = 0;//(只针对签名)弹出框相对于屏幕正中位置x偏移量，默认为0
//    this.dlgYoffset = 0;//(只针对签名)弹出框相对于屏幕正中位置y偏移量，默认为0
//    this.antialias = true;//(只针对签名)是否开启字迹抗锯齿算法
    this.singleWidth = 100;//(只针对签名)生成的签字最大宽度(不排除实际签名宽度小于此值)，单位像素
    this.singleHeight = 100;//(只针对签名)生成的签字最大高度(不排除实际签名高度小于此值)，单位像素
    this.penColor = "#000000";//RGB，默认为黑色，每通道为0~255的16进制值，如#ffffff为白色
//  this.signatureImgRatio = 1.0;//保存到加密包中的图片 相对于设置大小的倍数 如设置为100*160，该值为2.0时，则保存图片为100*2.0 *160*2.0，该值越大，则生成PDF中的签名越清晰，并且所占空间越大
    /////////////////////////deprecated

    this.timeTag = null;//签名人信息，为必填项, 1:时间在上、2：时间在下、3：时间在右
    this.isdistinguish = false;//是否开启识别
    this.ocrCapture = null;//识别参数

}

/**
 * 批注的配置信息
 * @param signer
 * @param signRule
 * @constructor
 */
function CommentConfig(signer, signRule)
{
    if(!signer || !signRule)
    {
        throw "CommentConfig constructor parameter signer or signRule could not be null.";
    }

    if(!(signRule instanceof SignRule_KeyWord) && !(signRule instanceof SignRule_Tid) && !(signRule instanceof SignRule_XYZ)
        && !(signRule instanceof SignRule_KeyWordV2) && !(signRule instanceof SignRule_KeyWordV3))
    {
        throw  "SignatureConfig constructor parameter signRule invalid, should be instance of SignRule_KeyWord or SignRule_Tid or SignRule_XYZ";
    }

    this.signer = signer;//签名人信息，为必填项
    this.signRule = signRule;//签名放置到文档中的规则，如位置，大小等，为必填项
    this.cid = 30;
    this.commitment = "本人已阅读保险条款、产品说明书和投保提示书，了解本产品的特点和保单利益的不确定性。";
    this.mass_words_in_single_line = 25;
    this.mass_word_height = 75;
    this.mass_word_width = 50;
    this.isTSS = false;
    this.penColor = "#000000";//RGB，默认为黑色，每通道为0~255的16进制值，如#ffffff为白色
    this.nessesary = false;//是否为必签项
    this.isdistinguish = false;//是否开启识别
    this.ocrCapture = null;//识别参数
    this.isShowBgText = true;
    this.currentEditBarTextColor = "#FF0000"

}


function OCRCapture()
{
	this.text = "a";

	this.IPAdress = "";

	this.appID = "";

	this.serviceID = "";

	this.resolution = 80;

	this.language = Language.CHS;

	this.count = 10;
}

/**
 * 单位签章对象，配合AnySignApi实例的addCachetObj配置一个单位签章
 * @param signer 签名人，参考Signer
 * @param signRule 签名规则，参考SignRule_KeyWord和SignRule_Tid
 * @param isTss bool, 是否加盖时间戳，默认为false
 * @constructor
 */
function CachetConfig(signer, signRule, isTss)
{
    if(!(signer instanceof Signer))
    {
        throw "CachetConfig constructor parameter signer invalid";
    }
    this.Signer = signer;

    if(!(signRule instanceof SignRule_KeyWord) && !(signRule instanceof SignRule_Tid) && !(signRule instanceof SignRule_XYZ)
        && !(signRule instanceof SignRule_KeyWordV2) && !(signRule instanceof SignRule_KeyWordV3))
    {
        throw  "CachetConfig constructor parameter signRule invalid, should be instance of SignRule_KeyWord or SignRule_Tid or SignRule_XYZ";
    }
    this.SignRule = signRule;

    this.IsTSS = isTss;
}


/**
 * 关键字定位方式，寻找PDF中的关键字，根据关键字位置放置签名图片
 * @param keyword 关键字
 * @param keyWordAlignMethod 签字图片和关键字位置关系：等于1时，签字图片和关键字矩形重心重合
 *                            等于2时，签字图片位于关键字正下方，中心线对齐；等于3时，签字图片位于关键字正右方，中心线对齐；
 *                            等于4时，签字图片左上角和关键字右下角重合，可能额外附加偏移量，详见构造函数的offset参数
 * @param keyWordOffset 当keyWordAlignMethod非零时，额外附加的偏移量，单位pt
 * @param pageNo 寻找关键字的PDF起始页码
 * @param KWIndex KWIndex 第几个关键字
 * @constructor
 */
var SignRule_KeyWord = function(keyword, keyWordAlignMethod, keyWordOffset, pageNo, KWIndex)
{
    if(!keyword || keyword.length === 0)
    {
        throw "SignRule_KeyWordV2 constructor parameter keyword could not be null or empty";
    }

    if(keyWordAlignMethod !== 1 && keyWordAlignMethod !== 2 && keyWordAlignMethod !== 3 && keyWordAlignMethod != 4)
    {
        throw "SignRule_KeyWord constructor parameter keyWordAlignMethod invalid, should be one of '1' '2' '3' '4'";
    }

    this.RuleType = "0";

    if(!isNaN(pageNo) && !isNaN(keyWordOffset) && !isNaN(KWIndex))
    {
        this.KWRule = {KW:keyword, KWPos:keyWordAlignMethod, KWOffset:keyWordOffset, Pageno:pageNo,KWIndex:KWIndex, XOffset:0, YOffset:0};
    }
}



/**
   *根据关键字定位签名位置
   * @param keyWord 关键字字面值
   * @param xOffset X轴偏移量，适配关键字和规则
   * @param yOffset Y轴偏移量，适配关键字和规则
   * @param pageNo 签名在PDF中的页码，第几页查找关键字，正数为正序，当是负数为倒序
   * @param KWIndex KWIndex 第几个关键字
   * @constructor  批注暂不支持
   */
var SignRule_KeyWordV2 = function(keyword, xOffset, yOffset, pageNo,  KWIndex){
    if(!keyword || keyword.length === 0)
    {
        throw "SignRule_KeyWordV2 constructor parameter keyword could not be null or empty";
    }
    this.RuleType = "0";

    if(!isNaN(pageNo) && !isNaN(KWIndex))
    {
        this.KWRule = {KW:keyword, KWPos: 0,KWOffset:0,XOffset:xOffset, YOffset:yOffset, Pageno :pageNo,KWIndex:KWIndex};
    }

}

/**
 * 使用服务器规则配置签名
 * @param tid 服务器端生成的配置规则
 * @constructor
 */
var SignRule_Tid = function(tid)
{
    if(!tid || tid.length === 0)
    {
        throw "SignRule_Tid constructor parameter tid could not be null or empty";
    }

    this.RuleType = "2";

    this.Tid = tid;
}

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
var SignRule_XYZ = function(left, top, right, bottom, pageNo, unit)
{
    if(isNaN(left) || isNaN(top) || isNaN(right) || isNaN(bottom) || isNaN(pageNo))
    {
        throw "SignRule_XYZ constructor parameter invalid, only float or int permitted";
    }

    if(right < left)
    {
        throw "SignRule_XYZ constructor left must be less than right"
    }

    if(top < bottom)
    {
        throw "SignRule_XYZ constructor top must not be less than bottom"
    }

    if(!unit || (unit !== "pt" && unit !== "dp"))
    {
        throw "SignRule_XYZ constructor parameter unit can only be 'dp' or 'pt'";
    }

    this.RuleType = "1";

    this.XYZRule = {Left:left, Top:top, Right:right, Bottom:bottom, Pageno:pageNo, Unit:unit};
}

var Signer = function(name, id_num)
{
    if(!name || !id_num || name.length === 0 || id_num.length === 0)
    {
        throw "Signer constructor parameter name and id could not be null or empty";
    }

    this.UName = name;

    this.IDNumber = id_num;

    this.IDType = "1";
}

var TimeTag = function(position, format)
{
    if(!position || !format || position.length === 0 || format.length === 0)
    {
        throw "TimeTag constructor parameter { and position could not be null or empty";
    }

    this.Pos = position;//1:时间在上、2：时间在下、3：时间在右

    this.Format = format;
}

//用于DataConfig的format项，当此项为多媒体时使用，其它情况format项为null即可
var DataFormat =
{
    IMAGE_GIF : "image/gif",
    IMAGE_JPEG : "image/jpeg",
    IMAGE_PNG : "image/png",
    MEDIA_AU : "media/au",
    MEDIA_AIFF : "media/aiff",
    MEDIA_WAVE : "media/wave",
    MEDIA_MIDI : "media/midi",
    MEDIA_MP4 : "media/mp4",
    MEDIA_M4V : "media/m4v",
    MEDIA_3G2 : "media/3g2",
    MEDIA_3GP2 : "media/3gp2",
    MEDIA_3GP : "media/3gp",
    MEDIA_3GPP : "media/3gpp"
}

var TemplateType =
{
    XML : 10,
    HTML : 11,
    PDF : 12,
    JSON : 13,
    PRESERVED : 19
};

var EncAlgType =
{
    EncAlg : "RSA"
};

var BioType =
{
    /** 签名人居民身份证正面 **/
    PHOTO_SIGNER_IDENTITY_CARD_FRONT : 0,
    /** 签名人居民身份证背面 **/
    PHOTO_SIGNER_IDENTITY_CARD_BACK : 1,
    /** 签名人复述录音 **/
    SOUND_SIGNER_RETELL : 2,
    /** 签名人自定义录音 **/
    SOUND_SIGNER_OTHER : 3
};

var Language =
{
	CHS : 1,
	CHT : 2
}
