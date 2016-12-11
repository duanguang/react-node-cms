import {IActionGeneric} from 'redux';
import {PromiseActionType, PromiseAction, createAction} from '../../../utils/redux';
import {UserRegistInfo, UserFormLogin} from '../../../model/userRegistInfo';
import {Dispatch} from "redux";
import {ResponseOuterModel} from '../../../model/common/commonResult';
import  * as userManageService from '../../../api/user/userManageService'
import {IUserIndexStore} from "../../reducers/user/userIndex";
import {ErrorPageEntity} from "../../../model/common/errorEntity";
import {UserLoginPageEntity} from "../../../model/user/userLoginEntity";
import {VAuthPageEntity} from "../../../model/user/VAuthEntity";

export const REGIST_USER_INFO=new PromiseActionType('user/userIndex/REGIST_USER_INFO');
export const USER_LOGIN=new PromiseActionType('user/userIndex/USER_LOGIN');
export const RESET = 'user/userIndex/RESET';
export const DECRYPT_MEMBER_CK=new PromiseActionType('user/userIndex/DECRYPT_MEMBER_CK');

export function submitRegist(userRegistInfo:UserRegistInfo){
    return (dispatch:Dispatch)=>{
        dispatch(new PromiseAction<void,ResponseOuterModel>(
               ()=> userManageService.registUser(userRegistInfo),
               REGIST_USER_INFO.types
           ));
    }
}

export function userLogin(userName:string,userPassWord:string,code:string){
    return(dispatch:Dispatch,getState:IUserIndexStore)=>{
          dispatch(new PromiseAction<void,UserLoginPageEntity>(
              ()=> userManageService.userLogin(userName,userPassWord,code),
              USER_LOGIN.types
          ));
    }
}


export function isUserLogin(memberCk:string){
    return(dispatch:Dispatch,getState:IUserIndexStore)=>{
        dispatch(new PromiseAction<void,VAuthPageEntity>(
            ()=> userManageService.isUserLogin(memberCk),
            DECRYPT_MEMBER_CK.types
        ));
    }
}



