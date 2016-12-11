"use strict";
/**
 * Created by DuanG on 2016/8/26.
 */
var errorHandler = require('errorhandler');
var notifier = require('node-notifier');
var app_1 = require('../routes/app');
var server_config_1 = require('../configs/server-config');
function errorNotification(err, str, req, res) {
    var title = 'Error in' + req.method + '' + req.url;
    notifier.notify({
        title: title,
        message: str
    });
}
;
exports.init = function () {
    if (server_config_1.SERVER_CONFIG.env == server_config_1.DEV) {
        app_1.app.use(errorHandler({ log: errorNotification }));
    }
    exports.init = function () {
        throw new Error('timeout-parser.ts: Timeout parser has been initialized.');
    };
};
