"use strict";
var EnumTool_1 = require("./EnumTool");
/**
 * Created by xiaoduan on 2016/11/7.
 */
function equal(a, b, stringComparison) {
    switch (stringComparison) {
        case EnumTool_1.StringComparison.OrdinalIgnoreCase:
            if (b.toLowerCase() === a.toLowerCase()) {
                return true;
            }
        default:
            if (a === b) {
                return true;
            }
    }
    return false;
}
exports.equal = equal;
