"use strict";
/**
 * Created by XD on 2016/9/15.
 */
var express = require('express');
var router = express.Router();
var Bearcat = require('bearcat');
var cookie_1 = require('../../common/cookie');
var cookieKey_1 = require('../../common/cookieKey');
var keyMemberCK_1 = require('../../common/keyMemberCK');
/*var NodeRSA=require('node-rsa');*/
router.post('/login', function (req, res) {
    var UserInfoServer = Bearcat.getBean('UserInfoService');
    var userName = req.body.UserName;
    var passWord = req.body.UserPassWord;
    var code = req.body.Code;
    var cookieCode = cookie_1.getCookie(cookieKey_1.ValidateCodeKey, req);
    UserInfoServer.userLogin(userName, passWord, code, cookieCode).then(function (result) {
        var m = JSON.parse(result);
        if (m.State === 1) {
            var options_1 = {
                UserName: userName,
                UserPassWord: passWord
            };
            var option = keyMemberCK_1.keyMemberCK().encrypt(JSON.stringify(options_1), 'base64');
            //console.log(key.decrypt(option,'utf-8'));
            m.Result = { Message: m.Result, MemberCK: encodeURIComponent(option) };
            cookie_1.setCookie('MemberCK', encodeURIComponent(option), res, { expires: 15, path: '/' });
        }
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Credentials': true });
        res.end(JSON.stringify(m));
        return;
    });
});
module.exports = router;
