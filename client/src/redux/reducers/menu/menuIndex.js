import { PromiseState, promiseReducer } from "../../../utils/redux";
import { combineReducers } from "redux";
import * as ActionTypes from 'actions/menu/menuIndex';
const initState = {
    currentMenu: new PromiseState()
};
export default combineReducers({
    currentMenu: promiseReducer(ActionTypes.GET_CURRENT_MENU, initState.currentMenu)
});
