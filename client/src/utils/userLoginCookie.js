import { set, get, clear } from 'utils/cookie';
export function insertUserLoginCookie(memberCK) {
    var value = getUserLoginCookie('MemberCK');
    if (value === '' || value === null) {
        return set('MemberCK', memberCK, { expires: 15 });
    }
}
export function getUserLoginCookie(key) {
    return get(key);
}
export function clearUserLoginCookie(key) {
    return clear(key);
}
