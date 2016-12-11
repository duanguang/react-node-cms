import {IAction, IActionGeneric} from 'redux';

export const SYSTEM_PROMISE_ACTION = 'system/SYSTEM_PROMISE_ACTION';

export function createAction<T>(type:string,payload?:T,err?:Error):IActionGeneric<T>{
    return{
       type:type,
       payload:payload,
        error:err
    };
}
export class PromiseActionType {
    REQUEST:string;
    SUCCESS:string;
    FAIL:string;
    types:string[];

    constructor(type:string) {
        this.REQUEST = type + "_REQUEST";
        this.SUCCESS = type + "_SUCCESS";
        this.FAIL = type + "_Fail";
        this.types = [this.REQUEST, this.SUCCESS, this.FAIL];
    }
}

export enum PromiseStatus{
    None = 0,
    Loading = 1,
    Loaded = 2,
    Error = 3
}

export class PromiseState<T> {
    status:PromiseStatus;
    data:T;
    error:Error;

    constructor(status:PromiseStatus = PromiseStatus.None, data?:T, err?:Error) {
        this.status = status;
        this.data = data;
        this.error = err;
    }

    request():PromiseState<T> {
        return new PromiseState<T>(PromiseStatus.Loading, this.data, this.error);
    }

    success(data:T):PromiseState<T> {
        return new PromiseState<T>(PromiseStatus.Loaded, data);
    }

    fail(error:Error):PromiseState<T> {
        return new PromiseState<T>(PromiseStatus.Error, null, error);
    }
    none(data: T): PromiseState<T> {
        return new PromiseState<T>(PromiseStatus.None, data);
    }
    isNone(): boolean {
        return this.status === PromiseStatus.None;
    }

    isLoaded(): boolean {
        return this.status === PromiseStatus.Loaded;
    }

    isLoading(): boolean {
        return this.status === PromiseStatus.Loading;
    }

    isError(): boolean {
        return this.status === PromiseStatus.Error;
    }
}

export interface IPromiseAction<TRequest,TResult> extends IActionGeneric<TResult> {
    meta:PromiseActionMeta<TRequest,TResult>;
}

class PromiseActionMeta<TRequest,TResult> {
    func:()=>Promise<TResult>;
    types:string[];
    request:TRequest;

    constructor(func:()=>Promise<TResult>, types:string[], request?:TRequest) {
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

export class PromiseAction<TRequest,TResult> implements IPromiseAction<TRequest,TResult> {
    type:string;
    meta:PromiseActionMeta<TRequest,TResult>;

    constructor(func:()=>Promise<TResult>, types:string[], request?:TRequest) {
        this.type = SYSTEM_PROMISE_ACTION;
        this.meta = new PromiseActionMeta(func, types, request);
    }
}

export function promiseReducer<T>(type:PromiseActionType, initialState:PromiseState<T>):(state:PromiseState<T>, action:IActionGeneric<T>)=>PromiseState<T> {
    return (state:PromiseState<T> = initialState, action:IActionGeneric<T>)=> {
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
        return next(action)
    }

    let meta = action.meta;

    if (!meta.func) {
        throw new Error('Specify a function return prmise object.')
    }

    const [ requestType, successType, failureType ] = meta.types || [, , ,];
    requestType && next(actionWith(requestType, meta, null, null));
    //promiseAction.loading && next(SystemActions.loading());

    return meta.func().then(
        result => {
            //promiseAction.loading && next(SystemActions.loaded());
            successType && next(actionWith(successType, meta, result, null));
            return result;
        },
        error => {
            //promiseAction.loading && next(SystemActions.loaded());
            failureType && next(actionWith(failureType, meta, null, error || new Error('系统异常')));
            return error;
        }
    );
};

function actionWith(type, meta, payload?, error?):IAction {
    let result:any = {type: type};
    payload && (result.payload = payload);
    payload && (result.error = error);
    meta.request && (result.meta = {request: meta.request});
    return result;
}
