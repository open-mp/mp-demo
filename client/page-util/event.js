class EE {
    constructor(name, fn, context, once) {
        this.name = name;
        this.fn = fn;
        this.context = context;
        this.once = once || false;
    }
}


module.exports = class EventEmitter {
    constructor() {
        this._events = {};
        this._eventsCount = 0;
        this.idEventsMap = {};
    }

    eventNames() {
        let names = [];
        let events = this._events;

        if (this._eventsCount === 0) return names;

        for (let name in events) {
            names.push(name);
        }

        return names;
    }

    listeners(event) {
        let handlers = this._events[event];

        if (!handlers) return [];
        if (handlers.fn) return [handlers.fn];
        let l = handlers.length;
        let ee = new Array(l);

        for (let i = 0; i < l; i++) {
            ee[i] = handlers[i].fn;
        }
        return ee;
    }

    listenerCount(event) {
        let listeners = this._events[event];

        if (!listeners) return 0;
        if (listeners.fn) return 1;
        return listeners.length;
    };

    emit(event, a1, a2, a3, a4, a5) {
        if (!this._events[event]) {
            return false;
        }

        let listeners = this._events[event];
        let len = arguments.length;
        let args;
        let i;

        if (listeners.fn) {
            if (listeners.once) this.removeListener(event, listeners.fn, listeners.context, true);

            switch (len) {
                case 1:
                    return listeners.fn.call(listeners.context), true;
                case 2:
                    return listeners.fn.call(listeners.context, a1), true;
                case 3:
                    return listeners.fn.call(listeners.context, a1, a2), true;
                case 4:
                    return listeners.fn.call(listeners.context, a1, a2, a3), true;
                case 5:
                    return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
                case 6:
                    return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
            }

            args = new Array(len - 1);
            for (i = 1; i < len; i++) {
                args[i - 1] = arguments[i];
            }

            listeners.fn.apply(listeners.context, args);
        } else {
            let length = listeners.length;
            let j;

            for (i = 0; i < length; i++) {
                if (listeners[i].once) this.removeListener(event, listeners[i].fn, listeners[i].context, true);

                switch (len) {
                    case 1:
                        listeners[i].fn.call(listeners[i].context);
                        break;
                    case 2:
                        listeners[i].fn.call(listeners[i].context, a1);
                        break;
                    case 3:
                        listeners[i].fn.call(listeners[i].context, a1, a2);
                        break;
                    case 4:
                        listeners[i].fn.call(listeners[i].context, a1, a2, a3);
                        break;
                    default:
                        for (j = 1, args = new Array(len - 1); j < len; j++) {
                            args[j - 1] = arguments[j];
                        }
                        listeners[i].fn.apply(listeners[i].context, args);
                }
            }
        }

        return true;
    }

    on(id, event, fn) {
        return this.addListener(event, fn, this, false);
    }

    once(id, event, fn) {
        return this.addListener(event, fn, this, true);
    }

    addListener(id, event, fn, context, once) {


        if (typeof fn !== 'function') {
            throw new TypeError('The listener must be a function');
        }

        let componentEvents = this.idEventsMap[id] || [];

        let listener = new EE(event, fn, context || this, once);

        componentEvents.push(listener);
        this.idEventsMap[id] = componentEvents;

        if (!this._events[event]) { // 还没有注册

            this._events[event] = listener;
            this._eventsCount++;

        } else if (!this._events[event].fn) {// 有监听列表

            this._events[event].push(listener);

        } else { // 存在一个监听

            this._events[event] = [this._events[event], listener];
        }

        return this;
    }


    removeListener(event, fn, context, once) {
        if (!this._events[event]) {
            return this;
        }

        if (!fn) {
            this.clearEvent(event);
            return this;
        }

        let listeners = this._events[event];

        if (listeners.fn) {
            if (
                listeners.fn === fn &&
                (!once || listeners.once) &&
                (!context || listeners.context === context)
            ) {
                this.clearEvent(event);
            }
        } else {
            let events = [];
            let length = listeners.length;
            for (let i = 0; i < length; i++) {
                if (
                    listeners[i].fn !== fn ||
                    (once && !listeners[i].once) ||
                    (context && listeners[i].context !== context)
                ) {
                    events.push(listeners[i]);
                }
            }

            if (events.length) {
                this._events[event] = events.length === 1 ? events[0] : events;
            } else {
                this.clearEvent(event);
            }
        }

        return this;
    }

    off(event, fn, context, once) {
        this.removeListener(event, fn, context, once);
    }

    removeAllListeners(event) {

        if (event) {
            if (this._events[event]) {
                this.clearEvent(event);
            }
        } else {
            this._events = {};
            this._eventsCount = 0;
        }
        return this;
    }

    removeListenersById(id) {
        let events = this.idEventsMap[id] || [];
        for (let event of events) {
            this.off(event.name, event.fn, event.context, event.once);
        }
        return this;
    }

    clearEvent(evt) {
        if (!this._events[evt]) return this;

        --this._eventsCount;

        if (this._eventsCount === 0) {
            this._events = {};
        } else {
            delete this._events[evt];
        }
    }

}



