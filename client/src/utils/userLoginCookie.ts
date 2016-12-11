/**
 * Created by xiaoduan on 2016/11/2.
 */
import {set,get,clear} from 'utils/cookie';
export function insertUserLoginCookie(memberCK:string){
    var value= getUserLoginCookie('MemberCK');
    if(value===''||value===null) {
        return set('MemberCK', memberCK, {expires: 15});
    }
}
export function getUserLoginCookie(key:string){
    return get(key);
}
export function clearUserLoginCookie(key:string){
    return clear(key);
}