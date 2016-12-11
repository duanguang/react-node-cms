"use strict";
var express = require('express');
var router = express.Router();
var Bearcat = require('bearcat');
var UserInfo_1 = require('../../models/UserInfo');
var url = require('url');
router.post('/regist', function (req, res) {
    var info = new UserInfo_1.UserInfo();
    // info.UserId=1;
    info.TrueName = req.body.trueName;
    info.Email = req.body.email;
    info.IsDelete = 0;
    info.Mobile = req.body.mobile;
    info.UserName = req.body.userName;
    info.UserPassword = req.body.userPassword;
    info.CreateDate = new Date().toDateString();
    var UserInfoServer = Bearcat.getBean('UserInfoService');
    UserInfoServer.InsertUser(info).then(function (result) {
        console.log(result);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        // res.end(JSON.stringify(result));
        //console.log(result)
        res.end(result);
        return;
    });
});
module.exports = router;
