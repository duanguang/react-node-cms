/**
 * Created by xd on 2016/11/13 0013.
 */

declare module "redux-async-connect" {
    import {Reducer} from 'redux';
    import React = __React;
    namespace RAC {
        import Component = ReactRouter.Component;
        export class ReduxAsyncConnect extends React.Component<any,any> {
        }
        export const reducer: Reducer;
        export const asyncConnect: (item: Object)=>any;
        interface IReduxAsyncConnect {
            loaded: boolean
        }
    }
    export = RAC;
}