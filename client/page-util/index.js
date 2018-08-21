/**
 * 1. 支持组件间的事件通信方式
 * 2. 支持组件间的服务通信方式
 * 3. 支持组件响应页面的生命周期
 */
const EventEmitter = require('./event');

module.exports = class PageUtil extends EventEmitter {
    constructor() {
        super();
        this.componentList = [];
    }

    componentInited(initData) {
        let {id, instance, services} = initData;
        this.componentList.push(initData);
    }

    removeComponent(id) {
        // 清理组件注册的监听器
        this.removeListenersById(id);

        this.componentList = this.componentList.filter(component => {
            return component.id != id;
        })
    }

    getServiceImplList(name) {
        let list = [];
        for (let component of this.componentList) {
            if (component.services.indexOf(name) > -1) {
                list.push(component.instance);
            }
        }
        return list;
    }

    getComponentsHasMethod(methodName) {
        let list = [];
        for (let component of this.componentList) {
            if (component.instance[methodName]) {
                list.push(component.instance);
            }
        }
        return list;
    }
};
