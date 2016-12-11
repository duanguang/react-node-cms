"use strict";
/**
 * Created by XD on 2016/9/10.
 */
var protoObj2String = function (val) { return Object.prototype.toString.call(val); };
function getType(val) {
    return protoObj2String(val).replace(/^\[object (\w+)\]$/ig, '$1').toLowerCase();
}
exports.getType = getType;
function isTargetType(val) {
    var targetArr = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        targetArr[_i - 1] = arguments[_i];
    }
    return targetArr.some(function (target) {
        return protoObj2String(val) === "[object " + target + "]";
    });
}
exports.isTargetType = isTargetType;
function isUndefined(val) {
    return typeof val === 'undefined';
}
exports.isUndefined = isUndefined;
function isString(val) {
    return typeof val === 'string';
}
exports.isString = isString;
