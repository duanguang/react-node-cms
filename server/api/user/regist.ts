import express = require('express');
import * as path from 'path';
let router = express.Router();
var Bearcat = require('bearcat');
import {UserInfo} from '../../models/UserInfo';
var url=require('url');


router.post('/regist',(req:express.Request, res:express.Response)=> {

    var info=new UserInfo();
    // info.UserId=1;
    info.TrueName=req.body.trueName;
    info.Email=req.body.email;
    info.IsDelete=0;
    info.Mobile=req.body.mobile;
    info.UserName=req.body.userName;
    info.UserPassword=req.body.userPassword;
    info.CreateDate=new Date().toDateString();
    var UserInfoServer=Bearcat.getBean('UserInfoService');
    UserInfoServer.InsertUser(info).then((result)=>{
        console.log(result);
        res.writeHead(200, {'Content-Type': 'application/json'});
        // res.end(JSON.stringify(result));
        //console.log(result)
        res.end(result);
        return;
    });

});

export = router;
