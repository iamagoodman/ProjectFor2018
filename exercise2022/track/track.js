import { getEventMethod } from './utils1.js';
console.log(getEventMethod);
class Track {
  state = {
    server_url: '',
    show_log: true,
    timer: null, // 内部定时器
    user_id: undefined,
    waitingTrackTimer: 0, // 页面加载后等待上报时间
    enableWaitingTraker: false, // 是否开启页面加载一段时间后自动上报
    enableLoadTracker: false, // 是否开启页面加载主动上报，适宜多页面利用的pv上报
    enableHistoryTracker: false, // 是否开启页面history变动主动上报，适宜单页面利用的history路由
    enableHashTracker: true, // 是否开启页面hash变动主动上报，适宜单页面利用的hash路由
  };
  init({ user_id, ...props }) {
    if (!user_id) {
      return this.showError('user_id must have a value');
    }
    this.state = { ...this.state, user_id, ...props };
    if (this.state.enableHashTracker) this.listenHashChange();
    if (this.state.enableWaitingTraker) this.waitingTrack();
    console.log('init', this.state);
  }
  sendTrack(event_type, track_key) {
    // 发送track数据
    console.log('发送track数据', event_type, track_key);
  }
  showError(message) {
    throw new Error(message);
  }
  uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
  hashChangeFire() {
    console.log(this);
    console.log('URL产生了变化');
    this.sendTrack();
  }
  bindEvent(event_list, track_key) {
    // 绑定事件
    const that = this;
    const E = getEventMethod();
    for (var i = 0; i < event_list.length; i++) {
      const event_name = event_list[i];
      window[E.addMethod](
        E.prefix + event_name,
        function (e) {
          const event = getEvent(e);
          that.sendTrack(event.type, track_key);
        },
        false
      );
    }
  }
  waitingTrack() {
    this.state.timer = setTimeout(() => {
      console.log(`${this.state.waitingTrackTimer}秒后上报`);
      this.state.timer = null;
    }, this.state.waitingTrackTimer * 1000);
  }
  listenHashChange() {
    if (
      'onhashchange' in window &&
      (typeof document.documentMode === 'undefined' ||
        document.documentMode == 8)
    ) {
      // 浏览器支持onhashchange事件
      // TODO，对应新的hash执行的操作函数
      //   window.onhashchange = this.hashChangeFire;
      this.bindEvent(['hashchange'], 'innerHashChange');
      //   window.addEventListener('hashchange', this.hashChangeFire);
    } else {
      // 不支持则用定时器检测的办法
      setInterval(function () {
        // TODO，检测hash值或其中某一段是否更改的函数
        // 可以实现一个当前url 和 页面初始化时存在本地的url对比函数，当对比结果不同是，返回true，同时更新本地存的url
        var ischanged = isHashChanged();
        if (ischanged) {
          // TODO，对应新的hash执行的操作函数
          this.hashChangeFire();
        }
      }, 150);
    }
  }
}

export default new Track();
