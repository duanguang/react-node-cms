/**
 * Created by XD on 2016/9/16.
 */
import express=require('express');
let router=express.Router();
import {keyMemberCK} from  '../../common/keyMemberCK';
import {ResponseModel,ApiStateEnum} from "../../ResponseModel";
import {clearCookie,getCookie} from "../../common/cookie";
import {MemberCK} from '../../common/cookieKey';
import {response} from "../../common/ResponseTool";
import {equal} from "../../common/stringTool";
router.post('/chkUserLogin',(req:express.Request,res:express.Response)=>{
    setTimeout(()=>{
        let memberCk=req.body.memberCk;
        memberCk=decodeURIComponent(memberCk);

        try{
            let result=keyMemberCK().decrypt(memberCk,'utf-8');
            if(result&&equal(memberCk,getCookie(MemberCK,req))){
                console.log(result);
                // console.log(keyMemberCK().exportKey()+"private")
                response(res,JSON.stringify(ResponseModel.getSuccessResponseModel('登录成功')));
                return;
            }

        }catch (e){
            clearCookie(MemberCK,res);
        }
        response(res,JSON.stringify(ResponseModel.getErrorResponseModel('请先登录',ApiStateEnum.AuthFail)));
        return;
    },200)



});
export=router;