// components/goods/goods.js
Component({
  properties: {
    id: String 
  },

  data: {
    pullDownCount: 0
  },
  pageUtil: null,
  methods: {
    start({ pageUtil }) {
      this.pageUtil = pageUtil;
    },
    receiveData(data){
      console.log(data)
    },
    onPullDownRefresh() {
      this.setData({ pullDownCount: ++this.data.pullDownCount});
      wx.stopPullDownRefresh();
    },
    fireEvent() {
      this.pageUtil.emit('pull-down-count', this.data.pullDownCount);
    }
  },
  created () {},
  attached () {
    this.triggerEvent("inited", {
      instance: this,
      id: this.id,
      interfaces: ['goods'], // 组件实现的接口 其他组件可以通过接口名查询实现组件的接口
      pageEvent: ["pull-down-refresh"]
    })
  },
  moved() { },
  detached () { },
})
