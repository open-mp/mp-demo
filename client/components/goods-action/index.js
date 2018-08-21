// components/sku/sku.js
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
            pageUtil.addListener(this.id, "pull-down-count", (data) => {
                this.setData({count: data});
            });
        },
        pullGoodsDetail() {
            let componentList = this.pageUtil.getServiceImplList('goods-detail');
            let goodsDetail = componentList[0] && componentList[0].getGoodsDetail();
            this.setData({
                count: goodsDetail.count
            })
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
