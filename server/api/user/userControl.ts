/**
 * Created by xiaoduan on 2016/10/29.
 */

import express=require('express');
import path=require('path');
let router=express.Router();
var captchapng = require('captchapng');
import {setCookie} from '../../common/cookie';
import {ValidateCodeKey} from '../../common/cookieKey';
import {ResponseModel} from '../../ResponseModel';
router.get('/chkUserIsRegist',(req:express.Request,res:express.Response)=>{
    
    var info=ResponseModel.getErrorResponseModel("登录成功");
    console.log(JSON.stringify(info));
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(info));
    return;
});

router.get('/ValidateCode',(req:express.Request,res:express.Response)=>{
    var randomNumber=Math.random()*90000+10000;//>1000 &&<9001
    let code=parseInt(randomNumber.toString());
    var p = new captchapng(80,30,code.toString()); // width,height,numeric captcha
    p.color(67, 128, 71, 255);  // First color: background (red, green, blue, alpha)
    p.color(67, 128, 71, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = new Buffer(img,'base64');
    setCookie(ValidateCodeKey,encodeURIComponent(code.toString()),res,{expires:15,path:'/'});
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Access-Control-Expose-Headers':'Kad_O2O_Request',
        'Kad_O2O_Request':'xxxxxx',
        'K-Version':'1.0',
        'Access-Control-Allow-Headers':'Kad_O2O_Request',
        'Access-Control-Allow-Credentials':true
    });
    res.end(imgbase64);
});
export = router;