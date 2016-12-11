/**
 * Created by DuanG on 2016/11/23.
 */
import * as express from 'express';
import {Request, Response} from 'express';
import {MemberCK} from "../../common/cookieKey";
import {keyMemberCK} from "../../common/keyMemberCK";
import {getCookie, clearCookie} from "../../common/cookie";
import {response} from "../../common/ResponseTool";
import {ResponseModel, ApiStateEnum} from "../../ResponseModel";

export let requireAuthorization = express.Router();
requireAuthorization.use((req: Request, res: Response, next: Function) => {
    try{
        let result=keyMemberCK().decrypt(getCookie(MemberCK,req),'utf-8');
        if(result){//中间件拦截验证调用API权限 验证通过进入下一方法
            next();
        }
    }catch (e){
        clearCookie(MemberCK,res);
        response(res,JSON.stringify(ResponseModel.getErrorResponseModel('请先登录',ApiStateEnum.AuthFail)),401);
    }

});
