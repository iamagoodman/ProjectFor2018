// tracker.js
import extend from 'extend';
import {
  getEvent,
  getEventListenerMethod,
  getBoundingClientRect,
  getDomPath,
  getAppInfo,
  createUuid,
  reportTracker,
  createHistoryEvent,
} from './utils';

const defaultOptions = {
  useClass: false, // 是否用以后dom元素中的类名标识以后元素
  appid: 'default', // 利用标识，用来辨别埋点数据中的利用
  uuid: '', // 设施标识，主动生成并存在浏览器中,
  extra: {}, // 用户自定义上传字段对象
  enableTrackerKey: false, // 是否开启约定领有属性值为'tracker-key'的dom的点击事件主动上报
  enableHeatMapTracker: false, // 是否开启热力求主动上报
  enableLoadTracker: false, // 是否开启页面加载主动上报，适宜多页面利用的pv上报
  enableHistoryTracker: false, // 是否开启页面history变动主动上报，适宜单页面利用的history路由
  enableHashTracker: false, // 是否开启页面hash变动主动上报，适宜单页面利用的hash路由
  requestUrl: 'http://localhost:3000', // 埋点申请后端接口
};

const MouseEventList = [
  'click',
  'dblclick',
  'contextmenu',
  'mousedown',
  'mouseup',
  'mouseenter',
  'mouseout',
  'mouseover',
];

class Tracker {
  constructor(options) {
    this._isInstall = false;
    this._options = {};
    this._init(options);
  }

  /**
   * 初始化
   * @param {*} options 用户参数
   */
  _init(options = {}) {
    this._setConfig(options);
    this._setUuid();
    this._installInnerTrack();
  }

  /**
   * 用户参数合并
   * @param {*} options 用户参数
   */
  _setConfig(options) {
    options = extend(true, {}, defaultOptions, options);
    this._options = options;
  }

  /**
   * 设置以后设施uuid标识
   */
  _setUuid() {
    const uuid = createUuid();
    this._options.uuid = uuid;
  }

  /**
   * 设置以后用户标识
   * @param {*} userId 用户标识
   */
  setUserId(userId) {
    this._options.userId = userId;
  }

  /**
   * 设置埋点上报额定数据
   * @param {*} extraObj 须要加到埋点上报中的额定数据
   */
  setExtra(extraObj) {
    this._options.extra = extraObj;
  }

  /**
   * 约定领有属性值为'tracker-key'的dom点击事件上报函数
   */
  _trackerKeyReport() {
    const that = this;
    const eventMethodObj = getEventListenerMethod();
    const eventName = 'click';
    window[eventMethodObj.addMethod](
      eventMethodObj.prefix + eventName,
      function (event) {
        const eventFix = getEvent(event);
        const trackerValue = eventFix.target.getAttribute('tracker-key');
        if (trackerValue) {
          that.sendTracker('click', trackerValue, {});
        }
      },
      false
    );
  }

  /**
   * 通用事件处理函数
   * @param {*} eventList 事件类型数组
   * @param {*} trackKey 埋点key
   */
  _captureEvents(eventList, trackKey) {
    const that = this;
    const eventMethodObj = getEventListenerMethod();
    for (let i = 0, j = eventList.length; i < j; i++) {
      let eventName = eventList[i];
      window[eventMethodObj.addMethod](
        eventMethodObj.prefix + eventName,
        function (event) {
          const eventFix = getEvent(event);
          if (!eventFix) {
            return;
          }
          if (MouseEventList.indexOf(eventName) > -1) {
            const domData = that._getDomAndOffset(eventFix);
            that.sendTracker(eventFix.type, trackKey, domData);
          } else {
            that.sendTracker(eventFix.type, trackKey, {});
          }
        },
        false
      );
    }
  }

  /**
   * 获取触发事件的dom元素和地位信息
   * @param {*} event 事件类型
   * @returns
   */
  _getDomAndOffset(event) {
    const domPath = getDomPath(event.target, this._options.useClass);
    const rect = getBoundingClientRect(event.target);
    if (rect.width == 0 || rect.height == 0) {
      return;
    }
    let t = document.documentElement || document.body.parentNode;
    const scrollX = (t && typeof t.scrollLeft == 'number' ? t : document.body)
      .scrollLeft;
    const scrollY = (t && typeof t.scrollTop == 'number' ? t : document.body)
      .scrollTop;
    const pageX = event.pageX || event.clientX + scrollX;
    const pageY = event.pageY || event.clientY + scrollY;
    const data = {
      domPath: encodeURIComponent(domPath),
      offsetX: ((pageX - rect.left - scrollX) / rect.width).toFixed(6),
      offsetY: ((pageY - rect.top - scrollY) / rect.height).toFixed(6),
    };
    return data;
  }

  /**
   * 埋点上报
   * @param {*} eventType 事件类型
   * @param {*} eventId  事件key
   * @param {*} data 埋点数据
   */
  sendTracker(eventType, eventId, data = {}) {
    const defaultData = {
      userId: this._options.userId,
      appid: this._options.appid,
      uuid: this._options.uuid,
      eventType: eventType,
      eventId: eventId,
      ...getAppInfo(),
      ...this._options.extra,
    };
    const sendData = extend(true, {}, defaultData, data);
    console.log('sendData', sendData);

    const requestUrl = this._options.requestUrl;
    reportTracker(requestUrl, sendData);
  }

  /**
   * 装载sdk外部主动埋点
   * @returns
   */
  _installInnerTrack() {
    if (this._isInstall) {
      return this;
    }
    if (this._options.enableTrackerKey) {
      this._trackerKeyReport();
    }
    // 热力求埋点
    if (this._options.enableHeatMapTracker) {
      this._openInnerTrack(['click'], 'innerHeatMap');
    }
    // 页面load埋点
    if (this._options.enableLoadTracker) {
      this._openInnerTrack(['load'], 'innerPageLoad');
    }
    // 页面history变动埋点
    if (this._options.enableHistoryTracker) {
      // 首先监听页面第一次加载的load事件
      this._openInnerTrack(['load'], 'innerPageLoad');
      // 对浏览器history对象对办法进行改写，实现对单页面利用history路由变动的监听
      history['pushState'] = createHistoryEvent('pushState');
      history['replaceState'] = createHistoryEvent('replaceState');
      this._openInnerTrack(['pushState'], 'innerHistoryChange');
      this._openInnerTrack(['replaceState'], 'innerHistoryChange');
    }
    // 页面hash变动埋点
    if (this._options.enableHashTracker) {
      // 首先监听页面第一次加载的load事件
      this._openInnerTrack(['load'], 'innerPageLoad');
      // 同时监听hashchange事件
      this._openInnerTrack(['hashchange'], 'innerHashChange');
    }

    this._isInstall = true;
    return this;
  }

  /**
   * 开启外部埋点
   * @param {*} event 监听事件类型
   * @param {*} trackKey 埋点key
   * @returns
   */
  _openInnerTrack(event, trackKey) {
    return this._captureEvents(event, trackKey);
  }
}

export default Tracker;
