/**
 * Created by DuanG on 2016/8/26.
 */
import {app} from './app';
import {errRouter} from './error-handler';
import {testRouter} from './test';
import {AuthorizationInit} from "./AuthorizationInit";
//the current using
export let routesInit = ()=> {
    app.get('/image-proxy', require('./image-proxy'));
    app.get('/', require('./index'));
    //app.get('*', require('./index'));
    app.get("/bearcat",require("./bearcat"));
    app.get("/ValidateCode",require('../api/user/userControl'));
    app.get("/chkUserIsRegist",require('../api/user/userControl'));
    app.post("/regist",require("../api/user/regist"));
    app.post("/login",require('../api/user/login'));
    app.post("/chkUserLogin",require('../api/user/chkUserLogin'));
    app.post("/registTest",require("../api/user/registTest"));

    app.get('/test', testRouter);
    AuthorizationInit();//权限认证中间件
    app.use(errRouter);
    routesInit = ()=> {
        throw new Error('route/index.ts: routes have been initialised.')
    };
};