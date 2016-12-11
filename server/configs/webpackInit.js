"use strict";
/**
 * Created by XD on 2016/8/27.
 */
var routeConfig_1 = require('../routes/routeConfig');
var staticConfig_1 = require('./staticConfig');
var whmConfig_1 = require('./whmConfig');
var bundlerConfig_1 = require('./bundlerConfig');
var app_1 = require('../routes/app');
exports.webpackInit = function () {
    bundlerConfig_1.bundlerConfig(app_1.app);
    whmConfig_1.whmConfig(app_1.app);
    staticConfig_1.staticResourceInit();
    routeConfig_1.routeConfig(app_1.app);
    exports.webpackInit = function () {
        throw new Error('server/index.ts: server has been initialised.');
    };
};
