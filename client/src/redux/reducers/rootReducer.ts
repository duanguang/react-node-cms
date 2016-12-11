import {combineReducers} from 'redux';

import {routerReducer} from 'react-router-redux';
import app, {IAppReducer} from 'common/app';
import userIndex,{IUserReducer} from './user/userIndex';
import {reducer as reduxAsyncConnect, IReduxAsyncConnect} from 'redux-async-connect';
import menuIndex,{IMenuReducer} from './menu/menuIndex';
import blogIndex,{IBlogIndexReducer} from './blog/blogIndex';

export interface IStoreState{
    app:IAppReducer;
    userIndex:IUserReducer;
    menuIndex:IMenuReducer;
    reduxAsyncConnect: IReduxAsyncConnect;
    blogIndex:IBlogIndexReducer;
}
export const rootReducer=combineReducers({
    app,
    userIndex,
    menuIndex,
    blogIndex,
    reduxAsyncConnect: reduxAsyncConnect,
    routing: routerReducer,
});//合并Reducer