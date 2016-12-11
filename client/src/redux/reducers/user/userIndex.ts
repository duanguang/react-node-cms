import {IActionGeneric, combineReducers} from 'redux';
import {UserRegistInfo, UserFormLogin} from '../../../model/userRegistInfo';
import {PromiseState, IPromiseAction, PromiseStatus, createAction, promiseReducer} from '../../../utils/redux';
import * as ActionTypes from '../../actions/user/userIndex';
import {ResponseOuterModel} from '../../../model/common/commonResult';
import {routeState} from "../../../utils/route-state";
import {UserLoginPageEntity} from "../../../model/user/userLoginEntity";
import {VAuthPageEntity} from "../../../model/user/VAuthEntity";

export interface IUserIndexStore{
    userIndex:IUserReducer;
}
export interface IUserReducer{
    registUserResult:PromiseState<ResponseOuterModel>;
    loginResult:PromiseState<UserLoginPageEntity>;
    chkUserLoginResult:PromiseState<VAuthPageEntity>;
}
const initState:IUserReducer={
    registUserResult:new PromiseState<ResponseOuterModel>(),
    loginResult:new PromiseState<UserLoginPageEntity>(),
    chkUserLoginResult:new PromiseState<VAuthPageEntity>()
}
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
function registUserResult(state:PromiseState<ResponseOuterModel>=initState.registUserResult,action:IPromiseAction<string,ResponseOuterModel>):PromiseState<ResponseOuterModel>{
    switch(action.type){
        case ActionTypes.REGIST_USER_INFO.FAIL:
            return state.fail(action.error);

        case ActionTypes.REGIST_USER_INFO.REQUEST:
            return new PromiseState<ResponseOuterModel>(PromiseStatus.Loading);

        case ActionTypes.REGIST_USER_INFO.SUCCESS:
            return state.success(action.payload);

        default:
            return state;
    }
}
function loginResult(state:PromiseState<UserLoginPageEntity> =initState.loginResult,action:IPromiseAction<string,UserLoginPageEntity>):PromiseState<UserLoginPageEntity>{
    let newLoginResult=null;
    switch(action.type){
        case ActionTypes.USER_LOGIN.REQUEST:
            newLoginResult=new PromiseState<UserLoginPageEntity>(PromiseStatus.Loading);
            break;
        case ActionTypes.USER_LOGIN.SUCCESS:
            newLoginResult=state.success(action.payload);
            break;
        case ActionTypes.USER_LOGIN.FAIL:
            newLoginResult=state.fail(action.error);
            break;
    }
    if(!newLoginResult){
        return state;
    }
    return newLoginResult;
}

function chkUserLoginResult(state:PromiseState<VAuthPageEntity> =initState.chkUserLoginResult,action:IPromiseAction<string,VAuthPageEntity>):PromiseState<VAuthPageEntity>{
    let newLoginResult=null;
    switch(action.type){
        case ActionTypes.DECRYPT_MEMBER_CK.REQUEST:
            newLoginResult=new PromiseState<ResponseOuterModel>(PromiseStatus.Loading);
            break;
        case ActionTypes.DECRYPT_MEMBER_CK.SUCCESS:
            newLoginResult=state.success(action.payload);
            break;
        case ActionTypes.DECRYPT_MEMBER_CK.FAIL:
            newLoginResult=state.fail(action.error);
            break;
    }
    if(!newLoginResult){
        return state;
    }
    return newLoginResult;
}

export default combineReducers({
    registUserResult,
    loginResult,
    chkUserLoginResult
})
