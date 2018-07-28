// components/goods/goods.js
Component({
  properties: {
    id: String 
  },

  data: {

  },

  methods: {
      receiveData(data){
        console.log(data)
      }
  },
  created () {},
  attached () {
    this.triggerEvent("inited", {
      instance: this,
      id: this.id,
      pageEvent: [""]
    })
  },
  moved() { },
  detached () { },
})
