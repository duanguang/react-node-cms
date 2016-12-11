import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import app from 'common/app';
import userIndex from './user/userIndex';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';
import menuIndex from './menu/menuIndex';
import blogIndex from './blog/blogIndex';
export const rootReducer = combineReducers({
    app,
    userIndex,
    menuIndex,
    blogIndex,
    reduxAsyncConnect: reduxAsyncConnect,
    routing: routerReducer,
}); //合并Reducer
