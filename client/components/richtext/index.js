// components/sku/sku.js
Component({
    properties: {
        id: String,
        configData: Object
    },

    data: {

    },
    pageUtil: null,

    methods: {
        start({pageUtil}) {
            this.pageUtil = pageUtil;

        },
        pullGoodsDetail() {

        }
    },
    attached() {
        this.triggerEvent("inited", {
            instance: this,
            id: this.id
        })
    },
    detached() {
        this.pageUtil.removeComponent(this.id);
    },
});
