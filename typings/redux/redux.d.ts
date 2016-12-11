// Type definitions for Redux v3.3.1
// Project: https://github.com/rackt/redux
// Definitions by: William Buchwalter <https://github.com/wbuchwalter/>, Vincent Prouillet <https://github.com/Keats/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace Redux {

    export interface IAction {
        type: string | number;
    }
    export interface IActionGeneric<TPayload> extends IAction {
        payload?: TPayload;
        error?: Error;
        meta?: any;
    }
    export interface IReducer<TState> {
        (state: TState, action: IAction): TState;
    }
    export interface IReducerMap {
        [key: string]: IReducerMap | IReducer<any>
    }
    export interface IDispatch {
        (action: IAction): IAction;
    }

    export interface IMiddlewareStore<TState> {
        getState(): TState;

        dispatch: IDispatch;
    }

    export interface IStore<TState> extends IMiddlewareStore<TState> {
        subscribe(listener: (state: TState) => any): () => void;

        replaceReducer(nextReducer: IReducer<TState>): void;
    }

    export interface IMiddleware<State> {
        (middlewareStore: IMiddlewareStore<State>): (next: IDispatch) => IDispatch;
    }

    export interface ICreateStoreGeneric<TState> {
        (reducer: IReducer<TState>, initialState?: TState): IStore<TState>;
    }
    export interface IStoreEnhancerGeneric<TState> {
        (createStore: ICreateStoreGeneric<TState>): ICreateStoreGeneric<TState>;
    }
    
    interface ActionCreator extends Function {
        (...args: any[]): any;
    }

    interface Reducer extends Function {
        (state: any, action: any): any;
    }



    interface Dispatch extends Function {
        (action: any): any;
        (action: IAction): IAction;
    }

    interface StoreMethods {
        dispatch: Dispatch;
        getState(): any;
    }


    interface MiddlewareArg {
        dispatch: Dispatch;
        getState: Function;
    }

    interface Middleware extends Function {
        (obj: MiddlewareArg): Function;
    }

    class Store {
        getReducer(): Reducer;
        replaceReducer(nextReducer: Reducer): void;
        dispatch(action: any): any;
        getState(): any;
        subscribe(listener: Function): Function;
    }

    function createStore(reducer: Reducer, initialState?: any, enhancer?: Function): Store;
    function bindActionCreators<T>(actionCreators: T, dispatch: Dispatch): T;
    function combineReducers(reducers: any): Reducer;
    function applyMiddleware(...middlewares: Middleware[]): Function;
    function compose<T extends Function>(...functions: Function[]): T;

    export function createStore<TState>(reducer: IReducer<TState>, initialState?: TState): IStore<TState>;

    export function combineReducers(reducers: IReducerMap): IReducer<any>;
    export function combineReducers<TState>(reducers: IReducerMap): IReducer<TState>;

    export function applyMiddleware<TState>(...middlewares: IMiddleware<TState>[]): IStoreEnhancerGeneric<TState>;

    export function bindActionCreators<TActionCreator extends Function | { [key: string]: Function }>(actionCreators: TActionCreator, dispatch: IDispatch): TActionCreator;

    export function compose<TArg>(...functions: { (arg: TArg): TArg }[]): (arg: TArg) => TArg;
    export function compose(...functions: { (arg: any): any }[]): (arg: any) => any;
}

declare module "redux" {
    export = Redux;
}
