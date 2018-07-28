
// 记录生命周期事件要通知的组件
let pageEventNotice = {
  "page-scroll": []
}
// 记录组件的id，及其对应的实例。静态页中的组件固定，小程序编辑器为组件分配id。
let idComponentMap = {};
Page({
    data: {
        
    },

  onInited(event){
    let {instance, id, pageEvent} = event.target;
    idComponentMap[id] = instance;
  },
  // 页面声明周期响应函数
  onLoad () { },
  onReady() { },
  onShow() { },
  onHide() { },
  onUnload() { },
  onPullDownRefresh() { },
  onReachBottom() { },
  onShareAppMessage() { },
  onPageScroll() { },
  onTabItemTap() { },
  // end
})
