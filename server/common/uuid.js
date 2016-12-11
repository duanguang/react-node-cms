"use strict";
/**
 * Created by xiaoduan on 2016/11/23.
 */
var UUID = require('uuid-js');
function generateUUID() {
    return UUID.create().toString();
}
exports.generateUUID = generateUUID;
