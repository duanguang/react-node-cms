/**
 * Created by XD on 2016/9/15.
 */
import express=require('express');
let router=express.Router();
var Bearcat=require('bearcat');
import {setCookie,getCookie} from '../../common/cookie';
import {ValidateCodeKey} from '../../common/cookieKey';
import {keyMemberCK} from  '../../common/keyMemberCK';
import {equal} from "../../common/stringTool";
/*var NodeRSA=require('node-rsa');*/

router.post('/login',(req:express.Request,res:express.Response)=>{
    var UserInfoServer=Bearcat.getBean('UserInfoService');
    let userName=req.body.UserName;
    let passWord=req.body.UserPassWord;
    let code=req.body.Code;
    let cookieCode=getCookie(ValidateCodeKey,req);
    UserInfoServer.userLogin(userName,passWord,code,cookieCode).then((result)=>{
        var m=JSON.parse(result);
        if(m.State===1){
            let options={
                UserName:userName,
                UserPassWord:passWord
            };
            var option= keyMemberCK().encrypt(JSON.stringify(options),'base64');
            //console.log(key.decrypt(option,'utf-8'));
            m.Result={Message:m.Result,MemberCK:encodeURIComponent(option)};

            setCookie('MemberCK',encodeURIComponent(option),res,{expires:15,path:'/'});
        }

        res.writeHead(200, {'Content-Type': 'application/json','Access-Control-Allow-Credentials':true});
        res.end(JSON.stringify(m));
        return;
    });
});
export=router;