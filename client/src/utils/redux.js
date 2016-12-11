export const SYSTEM_PROMISE_ACTION = 'system/SYSTEM_PROMISE_ACTION';
export function createAction(type, payload, err) {
    return {
        type: type,
        payload: payload,
        error: err
    };
}
export class PromiseActionType {
    constructor(type) {
        this.REQUEST = type + "_REQUEST";
        this.SUCCESS = type + "_SUCCESS";
        this.FAIL = type + "_Fail";
        this.types = [this.REQUEST, this.SUCCESS, this.FAIL];
    }
}
export var PromiseStatus;
(function (PromiseStatus) {
    PromiseStatus[PromiseStatus["None"] = 0] = "None";
    PromiseStatus[PromiseStatus["Loading"] = 1] = "Loading";
    PromiseStatus[PromiseStatus["Loaded"] = 2] = "Loaded";
    PromiseStatus[PromiseStatus["Error"] = 3] = "Error";
})(PromiseStatus || (PromiseStatus = {}));
export class PromiseState {
    constructor(status = PromiseStatus.None, data, err) {
        this.status = status;
        this.data = data;
        this.error = err;
    }
    request() {
        return new PromiseState(PromiseStatus.Loading, this.data, this.error);
    }
    success(data) {
        return new PromiseState(PromiseStatus.Loaded, data);
    }
    fail(error) {
        return new PromiseState(PromiseStatus.Error, null, error);
    }
    none(data) {
        return new PromiseState(PromiseStatus.None, data);
    }
    isNone() {
        return this.status === PromiseStatus.None;
    }
    isLoaded() {
        return this.status === PromiseStatus.Loaded;
    }
    isLoading() {
        return this.status === PromiseStatus.Loading;
    }
    isError() {
        return this.status === PromiseStatus.Error;
    }
}
class PromiseActionMeta {
    constructor(func, types, request) {
        this.func = func;
        this.types = types;
        this.request = request;
    }
}
/*export class ActionGeneric<TPayload,TMeta> implements IActionGeneric<TPayload> {
 type:string;
 payload:TPayload;
 error:Error;
 meta:TMeta;

 constructor(type:string, payload?:TPayload, error?:Error, meta?:TMeta) {
 this.type = type;
 this.payload = payload;
 this.error = error;
 this.meta = meta;
 }
 }*/
export class PromiseAction {
    constructor(func, types, request) {
        this.type = SYSTEM_PROMISE_ACTION;
        this.meta = new PromiseActionMeta(func, types, request);
    }
}
export function promiseReducer(type, initialState) {
    return (state = initialState, action) => {
        switch (action.type) {
            case type.REQUEST:
                return state.request();
            case type.SUCCESS:
                return state.success(action.payload);
            case type.FAIL:
                return state.fail(action.error);
            default:
                return state;
        }
    };
}
export const promiseMiddleware = store => next => action => {
    if (action.type !== SYSTEM_PROMISE_ACTION) {
        return next(action);
    }
    let meta = action.meta;
    if (!meta.func) {
        throw new Error('Specify a function return prmise object.');
    }
    const [requestType, successType, failureType] = meta.types || [, , ,];
    requestType && next(actionWith(requestType, meta, null, null));
    //promiseAction.loading && next(SystemActions.loading());
    return meta.func().then(result => {
        //promiseAction.loading && next(SystemActions.loaded());
        successType && next(actionWith(successType, meta, result, null));
        return result;
    }, error => {
        //promiseAction.loading && next(SystemActions.loaded());
        failureType && next(actionWith(failureType, meta, null, error || new Error('系统异常')));
        return error;
    });
};
function actionWith(type, meta, payload, error) {
    let result = { type: type };
    payload && (result.payload = payload);
    payload && (result.error = error);
    meta.request && (result.meta = { request: meta.request });
    return result;
}
