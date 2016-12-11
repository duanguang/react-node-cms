import express = require('express');
import * as path from 'path';
let router = express.Router();
var Bearcat = require('bearcat');
import {UserInfo} from '../../models/UserInfo';
var url=require('url');
router.post('/registTest', (req:express.Request, res:express.Response)=> {

    var info=new UserInfo();
    // info.UserId=1;
    info.TrueName=req.body.TrueName;
    info.Email=req.body.Email;
    info.IsDelete=0;
    info.Mobile=req.body.Mobile;
    info.UserName=req.body.UserName;
    info.UserPassword=req.body.UserPassword;
    info.CreateDate=new Date().toDateString();
    var UserInfoServer=Bearcat.getBean('UserInfoService');
    // UserInfoServer.InsertUser(info);
    console.log(req.body)
    // console.log(url.parse('http://www.mgenware.com/a/b/c'))
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify("1"));
});

export = router;
