"use strict";
/**
 * Created by DuanG on 2016/11/23.
 */
var app_1 = require('./app');
var requireAuthorization_1 = require("../api/Authorization/requireAuthorization");
var blogRouteInit_1 = require("./blogRouteInit");
exports.AuthorizationInit = function () {
    app_1.app.use(requireAuthorization_1.requireAuthorization);
    blogRouteInit_1.blogRouteInit();
};
