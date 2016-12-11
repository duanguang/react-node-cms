"use strict";
var express = require('express');
var router = express.Router();
var Bearcat = require('bearcat');
var UserInfo_1 = require('../../models/UserInfo');
var url = require('url');
router.post('/registTest', function (req, res) {
    var info = new UserInfo_1.UserInfo();
    // info.UserId=1;
    info.TrueName = req.body.TrueName;
    info.Email = req.body.Email;
    info.IsDelete = 0;
    info.Mobile = req.body.Mobile;
    info.UserName = req.body.UserName;
    info.UserPassword = req.body.UserPassword;
    info.CreateDate = new Date().toDateString();
    var UserInfoServer = Bearcat.getBean('UserInfoService');
    // UserInfoServer.InsertUser(info);
    console.log(req.body);
    // console.log(url.parse('http://www.mgenware.com/a/b/c'))
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify("1"));
});
module.exports = router;
