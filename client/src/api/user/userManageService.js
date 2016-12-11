import * as http from '../../utils/request';
import { ResponseOuterModel } from '../../model/common/commonResult';
import { md5Hash } from "../../utils/hash";
import { get, post } from "../../utils/fetchRequest";
import { ErrorPageEntity } from "../../model/common/errorEntity";
import { UserLoginPageEntity } from "../../model/user/userLoginEntity";
import { VAuthPageEntity } from "../../model/user/VAuthEntity";
export function registUser(userRegistInfo) {
    userRegistInfo.userPassword = md5Hash.hash(userRegistInfo.userPassword);
    userRegistInfo.reUserPassword = "";
    return http.post('http://127.0.0.1:3006/regist', userRegistInfo).then((result) => {
        return new ResponseOuterModel(result);
    });
}
export function userLogin(userName, userPassWord, code) {
    userPassWord = md5Hash.hash(userPassWord);
    /*    let option = {
            processData: false,
            dataType: 'json',
            contentType: 'application/json',
        };*/
    /*return http.post('http://127.0.0.1:3006/login',{UserName:userName,UserPassWord:userPassWord,Code:code}).then((result)=>{
       return new ResponseOuterModel(result);
    });*/
    return post('http://127.0.0.1:3006/login', { UserName: userName, UserPassWord: userPassWord, Code: code }, UserLoginPageEntity).then((result) => {
        return result;
    });
}
export function isUserLogin(memberCk) {
    /*return http.post('http://127.0.0.1:3006/chkUserLogin',{memberCk:memberCk}).then((result)=>{
        return new ResponseOuterModel(result);
    });*/
    return post('http://127.0.0.1:3006/chkUserLogin', { memberCk: memberCk }, VAuthPageEntity).then((result) => {
        return result;
    });
}
export function chkUserNameIsRegist() {
    return get('http://127.0.0.1:3006/chkUserIsRegist', ErrorPageEntity).then((result) => {
        return result;
    });
}
