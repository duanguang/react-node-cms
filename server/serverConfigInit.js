"use strict";
/**
 * Created by DuanG on 2016/8/26.
 */
var routeInit_1 = require('./routes/routeInit');
var parserInit_1 = require('./configs/parserInit');
var staticConfig_1 = require('./configs/staticConfig');
var bearcatConfig_1 = require('./configs/bearcatConfig');
var app_1 = require('./routes/app');
exports.serverInit = function () {
    parserInit_1.parserInit();
    staticConfig_1.staticResourceInit();
    routeInit_1.routesInit();
    bearcatConfig_1.bearcatInit(app_1.app);
    exports.serverInit = function () {
        throw new Error('server/index.ts: server has been initialised.');
    };
};
