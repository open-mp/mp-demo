// components/sku/sku.js
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
      pageUtil.addListener("pull-down-count",(data)=>{
        this.setData({ pullDownCount: data});
      });
    }
  },
  attached() {
    this.triggerEvent("inited", {
      instance: this,
      id: this.id,
      pageEvent: ["pull-down-refresh"]
    })
  }
})
