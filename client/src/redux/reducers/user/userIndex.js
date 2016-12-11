import { combineReducers } from 'redux';
import { PromiseState, PromiseStatus } from '../../../utils/redux';
import * as ActionTypes from '../../actions/user/userIndex';
const initState = {
    registUserResult: new PromiseState(),
    loginResult: new PromiseState(),
    chkUserLoginResult: new PromiseState()
};
/*function registUserState(state:IRegistReducer=initState,action:IActionGeneric<any>):IRegistReducer{
    switch(action.type){
        case ActionTypes.REGIST_USER_INFO.FAIL:
            return Object.assign({},state,{registUserResult:state.registUserResult.fail(action.error)});

        case ActionTypes.REGIST_USER_INFO.REQUEST:
            return Object.assign({},state,{registUserResult:state.registUserResult.request()});

        case ActionTypes.REGIST_USER_INFO.SUCCESS:
            return Object.assign({},state,{registUserResult:state.registUserResult.success(action.payload)});
        
        default:
            return state;
    }
}*/
function registUserResult(state = initState.registUserResult, action) {
    switch (action.type) {
        case ActionTypes.REGIST_USER_INFO.FAIL:
            return state.fail(action.error);
        case ActionTypes.REGIST_USER_INFO.REQUEST:
            return new PromiseState(PromiseStatus.Loading);
        case ActionTypes.REGIST_USER_INFO.SUCCESS:
            return state.success(action.payload);
        default:
            return state;
    }
}
function loginResult(state = initState.loginResult, action) {
    let newLoginResult = null;
    switch (action.type) {
        case ActionTypes.USER_LOGIN.REQUEST:
            newLoginResult = new PromiseState(PromiseStatus.Loading);
            break;
        case ActionTypes.USER_LOGIN.SUCCESS:
            newLoginResult = state.success(action.payload);
            break;
        case ActionTypes.USER_LOGIN.FAIL:
            newLoginResult = state.fail(action.error);
            break;
    }
    if (!newLoginResult) {
        return state;
    }
    return newLoginResult;
}
function chkUserLoginResult(state = initState.chkUserLoginResult, action) {
    let newLoginResult = null;
    switch (action.type) {
        case ActionTypes.DECRYPT_MEMBER_CK.REQUEST:
            newLoginResult = new PromiseState(PromiseStatus.Loading);
            break;
        case ActionTypes.DECRYPT_MEMBER_CK.SUCCESS:
            newLoginResult = state.success(action.payload);
            break;
        case ActionTypes.DECRYPT_MEMBER_CK.FAIL:
            newLoginResult = state.fail(action.error);
            break;
    }
    if (!newLoginResult) {
        return state;
    }
    return newLoginResult;
}
export default combineReducers({
    registUserResult,
    loginResult,
    chkUserLoginResult
});
