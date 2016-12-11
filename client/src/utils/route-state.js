import hash from 'object-hash';
const RouteStateStorageKey = "@@route_state";
const MaxRouteStateStorageCount = 2;
export const ROUTE_STATE_CHANGE = "@routeState/ROUTE_STATE_CHANGE";
const RouteStateInitAction = 'INIT';
const RouteStatePushAction = 'PUSH';
const RouteStatePopAction = 'POP';
const RouteStateReplaceAction = 'REPLACE';
class RouteStateHistory {
    constructor(key) {
        this.key = key;
        this.states = [undefined];
        this.stack = [1];
    }
    get state() {
        return this.states[this.states.length - 1];
    }
    load(data) {
        this.states = data.states;
        this.stack = data.stack;
    }
    push() {
        this.stack[this.stack.length - 1] += 1;
    }
    pop(number) {
        if (number > 0) {
            let index = this.stack.length - 1;
            while (index >= 0 && number > 0) {
                if (this.stack[index] > number) {
                    this.stack[index] -= number;
                    break;
                }
                if (index == 0) {
                    this.stack[index] = 1;
                    break;
                }
                number -= this.stack[index];
                index--;
            }
            index++;
            if (index < this.stack.length) {
                this.stack.splice(index);
                this.states.splice(index);
            }
        }
    }
    update(state) {
        if (this.stack[this.stack.length - 1] > 1) {
            this.states.push(state);
            this.stack[this.stack.length - 1] -= 1;
            this.stack.push(1);
        }
        else {
            this.states[this.states.length - 1] = state;
        }
    }
}
let topPath = (state) => state.topPath;
class RouteStateManage {
    constructor(storage) {
        this.storage = storage;
        this.routeStates = [];
        this.locationKeys = [];
    }
    init(history, store) {
        history.listenBefore((location, callback) => {
            if (location.state && topPath(location.state)) {
                store.dispatch(this.routeStatePop(this.locationKeys.length));
            }
            callback();
        });
        history.listen((location) => {
            if (this.locationKeys.length == 0) {
                let data = this.restore(location.key);
                if (data) {
                    this.locationKeys = data.locationKeys;
                    data.routeStates.forEach((item) => {
                        let routeStateHistory = this.routeStates.find((q) => q.key == item.key);
                        if (routeStateHistory) {
                            routeStateHistory.load(item);
                        }
                    });
                }
            }
            const locationKeys = this.locationKeys;
            switch (location.action) {
                case "POP":
                    let index = locationKeys.length - 1;
                    while (index >= 0 && locationKeys[index] != location.key) {
                        index--;
                    }
                    let number = locationKeys.length - index - 1;
                    if (number > 0) {
                        locationKeys.splice(index + 1);
                        store.dispatch(this.routeStatePop(number));
                    }
                    if (locationKeys.length == 0) {
                        locationKeys.push(location.key);
                        store.dispatch(this.routeStatePush());
                    }
                    break;
                case "REPLACE":
                    store.dispatch(this.routeStateReplace());
                    break;
                case "PUSH":
                    locationKeys.push(location.key);
                    store.dispatch(this.routeStatePush());
                    break;
                default:
                    throw new Error('unknow location action');
            }
            console.log("locationKeys:" + this.locationKeys);
            console.log(this.routeStates);
            console.log("location.action:" + location.action);
        });
        window.onbeforeunload = (e) => {
            this.store();
        };
    }
    register(reducer) {
        let routeStateHistory = new RouteStateHistory(hash(reducer));
        this.routeStates.push(routeStateHistory);
        return function (state, action) {
            if (action.type == ROUTE_STATE_CHANGE) {
                let payload = action.payload;
                switch (payload.action) {
                    case RouteStatePushAction:
                        routeStateHistory.push();
                        break;
                    case RouteStatePopAction:
                        routeStateHistory.pop(payload.number);
                        break;
                    case RouteStateReplaceAction:
                        routeStateHistory.pop(1);
                        routeStateHistory.push();
                        break;
                }
                return routeStateHistory.state;
            }
            let newState = reducer(state, action);
            if (newState != state) {
                routeStateHistory.update(newState);
            }
            return newState;
        };
    }
    store() {
        try {
            let data = this.getStorageData();
            if (data.length >= MaxRouteStateStorageCount) {
                data.splice(0, data.length - MaxRouteStateStorageCount + 1);
            }
            data.push({
                historyIndex: window.history.length,
                routeStates: this.routeStates,
                locationKeys: this.locationKeys
            });
            this.saveStorageData(data);
        }
        catch (e) {
            console.log('store error:' + e);
        }
    }
    restore(locationKey) {
        try {
            let result = null;
            let data = this.getStorageData();
            for (let i = 0; i < data.length; i++) {
                if (data[i].locationKeys.indexOf(locationKey) >= 0) {
                    result = data[i];
                    data.splice(i, 1);
                    this.saveStorageData(data);
                    break;
                }
            }
            return result;
        }
        catch (e) {
            console.log('restore error:' + e);
        }
    }
    getStorageData() {
        let data = [];
        let value = this.storage.getItem(RouteStateStorageKey);
        if (value) {
            data = JSON.parse(value);
        }
        return data;
    }
    saveStorageData(data) {
        this.storage.setItem(RouteStateStorageKey, JSON.stringify(data));
    }
    routeStateReplace() {
        return {
            type: ROUTE_STATE_CHANGE,
            payload: {
                action: RouteStateReplaceAction
            }
        };
    }
    routeStatePop(number) {
        return {
            type: ROUTE_STATE_CHANGE,
            payload: {
                action: RouteStatePopAction,
                number: number
            }
        };
    }
    routeStatePush() {
        return {
            type: ROUTE_STATE_CHANGE,
            payload: {
                action: RouteStatePushAction,
            }
        };
    }
}
const routeStateManage = new RouteStateManage(window.sessionStorage);
export function syncRouteState(history, store) {
    routeStateManage.init(history, store);
}
export function routeState(reducer) {
    return routeStateManage.register(reducer);
}
