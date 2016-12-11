"use strict";
/**
 * Created by DuanG on 2016/8/26.
 */
var app_1 = require('./app');
var error_handler_1 = require('./error-handler');
var test_1 = require('./test');
var AuthorizationInit_1 = require("./AuthorizationInit");
//the current using
exports.routesInit = function () {
    app_1.app.get('/image-proxy', require('./image-proxy'));
    app_1.app.get('/', require('./index'));
    //app.get('*', require('./index'));
    app_1.app.get("/bearcat", require("./bearcat"));
    app_1.app.get("/ValidateCode", require('../api/user/userControl'));
    app_1.app.get("/chkUserIsRegist", require('../api/user/userControl'));
    app_1.app.post("/regist", require("../api/user/regist"));
    app_1.app.post("/login", require('../api/user/login'));
    app_1.app.post("/chkUserLogin", require('../api/user/chkUserLogin'));
    app_1.app.post("/registTest", require("../api/user/registTest"));
    app_1.app.get('/test', test_1.testRouter);
    AuthorizationInit_1.AuthorizationInit(); //权限认证中间件
    app_1.app.use(error_handler_1.errRouter);
    exports.routesInit = function () {
        throw new Error('route/index.ts: routes have been initialised.');
    };
};
