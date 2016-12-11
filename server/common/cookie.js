"use strict";
/**
 * Created by XD on 2016/9/16.
 */
function setCookie(key, value, res, options) {
    var DefaultOption = {
        expires: 15, path: '/', httpOnly: true, secure: false
    };
    options = options ? options : DefaultOption;
    options = Object.assign({}, options);
    if (value === null || value === undefined) {
        options.expires = -1;
    }
    if (typeof options.expires === 'number') {
        var days = options.expires, t = options.expires = new Date();
        t.setDate(t.getDate() + days);
    }
    value = String(value);
    res.cookie(key, value, options);
}
exports.setCookie = setCookie;
function getCookie(key, req) {
    var cookieValue = req.cookies[key];
    return cookieValue ? decodeURIComponent(cookieValue) : null;
}
exports.getCookie = getCookie;
function clearCookie(key, res) {
    res.clearCookie(key, null);
}
exports.clearCookie = clearCookie;
