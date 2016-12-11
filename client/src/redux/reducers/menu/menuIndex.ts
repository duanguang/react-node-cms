import {PromiseState, promiseReducer} from "../../../utils/redux";
import {CurrentMenu} from "../../../model/menu/currentMenu";
import {combineReducers} from "redux";
import * as ActionTypes from 'actions/menu/menuIndex';
/**
 * Created by xiaoduan on 2016/11/17.
 */

export interface IMenuIndexStore{
    menuIndex:IMenuReducer;
}

export interface IMenuReducer{
    currentMenu:PromiseState<CurrentMenu>;
}

const initState:IMenuReducer={
    currentMenu:new PromiseState<CurrentMenu>()
}

export default combineReducers({
    currentMenu:promiseReducer(ActionTypes.GET_CURRENT_MENU,initState.currentMenu)
})