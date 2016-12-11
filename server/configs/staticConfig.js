"use strict";
var express = require('express');
var path = require('path');
var app_1 = require('../routes/app');
var baseDir = path.resolve('.');
/* node路由，允许访问的路径*/
exports.staticConfig = function (app) {
    app.use("/common", express.static(baseDir + '/client/common/'));
    app.use("/client", express.static(baseDir + '/client'));
    app.use("/static", express.static(baseDir + '/static'));
    app.use("/favicon.ico", express.static(baseDir + '/favicon.ico'));
};
exports.staticResourceInit = function () {
    app_1.app.use(express.static(path.join(__dirname, 'public'))); //允许public文件资源被访问
    app_1.app.use("/common", express.static(baseDir + '/client/common/'));
    app_1.app.use("/upload", express.static(baseDir + '/server/upload/'));
    app_1.app.use("/static", express.static(baseDir + '/static'));
    app_1.app.use("/favicon.ico", express.static(baseDir + '/favicon.ico'));
    exports.staticResourceInit = function () {
        throw new Error("static-resource.ts: Static resources have been initialized.");
    };
};
