import { PromiseActionType, PromiseAction } from '../../../utils/redux';
import * as userManageService from '../../../api/user/userManageService';
export const REGIST_USER_INFO = new PromiseActionType('user/userIndex/REGIST_USER_INFO');
export const USER_LOGIN = new PromiseActionType('user/userIndex/USER_LOGIN');
export const RESET = 'user/userIndex/RESET';
export const DECRYPT_MEMBER_CK = new PromiseActionType('user/userIndex/DECRYPT_MEMBER_CK');
export function submitRegist(userRegistInfo) {
    return (dispatch) => {
        dispatch(new PromiseAction(() => userManageService.registUser(userRegistInfo), REGIST_USER_INFO.types));
    };
}
export function userLogin(userName, userPassWord, code) {
    return (dispatch, getState) => {
        dispatch(new PromiseAction(() => userManageService.userLogin(userName, userPassWord, code), USER_LOGIN.types));
    };
}
export function isUserLogin(memberCk) {
    return (dispatch, getState) => {
        dispatch(new PromiseAction(() => userManageService.isUserLogin(memberCk), DECRYPT_MEMBER_CK.types));
    };
}
