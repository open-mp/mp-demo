// components/goods/goods.js
Component({
    properties: {
        id: String
    },

    data: {
        count: 0
    },
    pageUtil: null,
    methods: {
        start({pageUtil}) {
            this.pageUtil = pageUtil;
        },
        receiveData(data) {
            console.log(data)
        },
        onPullDownRefresh() {
            this.setData({count: ++this.data.count});
            wx.stopPullDownRefresh();
        },
        fireEvent() {
            this.pageUtil.emit('pull-down-count', this.data.count);
        },
        getGoodsDetail() {
            return {
                count: this.data.count
            }
        },
        decrease() {
            this.setData({count: --this.data.count});
        },
        add() {
            this.setData({count: ++this.data.count});
        }
    },
    created() {
    },
    attached() {
        this.triggerEvent("inited", {
            instance: this,
            id: this.id,
            services: ['goods-detail'], // 组件实现的接口 其他组件可以通过接口名查询实现组件的接口
        })
    },
    moved() {
    },

    detached() {
        this.pageUtil.removeComponent(this.id);
    },
});
