const PageUtil = require("../../page-util/index.js")
// 记录生命周期事件要通知的组件
let pageEventNotice = {
  "pull-down-refresh": []
}
// 记录组件的id，及其对应的实例。静态页中的组件固定，小程序编辑器为组件分配id。
let idComponentMap = {};
Page({
    data: {
        
    },
  pageUtil: null,
  onInited(event){
    let {instance, id, pageEvent} = event.detail;
    idComponentMap[id] = instance;
    if (pageEvent instanceof Array) {
      pageEvent.forEach(eventName => {
        pageEventNotice[eventName].push(id);
      })
    }
    let pageUtil = this.getPageUtil();
    instance.start({ pageUtil})
  },
  getPageUtil(){
    if (!this.pageUtil) {
      this.pageUtil = new PageUtil();
    }
    return this.pageUtil;
  },
  // 页面声明周期响应函数
  onLoad () {
  },
  onReady() { },
  onShow() { },
  onHide() { },
  onUnload() { },
  onPullDownRefresh() {
    pageEventNotice['pull-down-refresh'].forEach(id => {
      idComponentMap[id].onPullDownRefresh && idComponentMap[id].onPullDownRefresh();
    })
  },
  onReachBottom() { },
  onShareAppMessage() { },
  onPageScroll() { },
  onTabItemTap() { },
  // end
})
