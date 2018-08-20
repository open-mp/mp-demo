/**
 * 1. 支持组件间的事件通信方式
 * 2. 支持组件间的服务通信方式
 * 3. 支持组件响应页面的生命周期
 */
const EventEmitter = require('./event');

module.exports = class PageUtil extends EventEmitter {
    constructor() {
        super();
    }

}
