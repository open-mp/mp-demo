module.exports = class {
  constructor(){
    this.eventMap = {}
  }

  addListener(eventName, listener) {
    this.eventMap[eventName] = listener
  }
  emit(eventName, data) {
    this.eventMap[eventName](data);
  } 

  once(eventName, listener) {

  }
}