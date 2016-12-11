/**
 * Created by xiaoduan on 2016/10/29.
 */
"use strict";
var express = require('express');
var router = express.Router();
var captchapng = require('captchapng');
var cookie_1 = require('../../common/cookie');
var cookieKey_1 = require('../../common/cookieKey');
var ResponseModel_1 = require('../../ResponseModel');
router.get('/chkUserIsRegist', function (req, res) {
    var info = ResponseModel_1.ResponseModel.getErrorResponseModel("登录成功");
    console.log(JSON.stringify(info));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(info));
    return;
});
router.get('/ValidateCode', function (req, res) {
    var randomNumber = Math.random() * 90000 + 10000; //>1000 &&<9001
    var code = parseInt(randomNumber.toString());
    var p = new captchapng(80, 30, code.toString()); // width,height,numeric captcha
    p.color(67, 128, 71, 255); // First color: background (red, green, blue, alpha)
    p.color(67, 128, 71, 255); // Second color: paint (red, green, blue, alpha)
    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    cookie_1.setCookie(cookieKey_1.ValidateCodeKey, encodeURIComponent(code.toString()), res, { expires: 15, path: '/' });
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Access-Control-Expose-Headers': 'Kad_O2O_Request',
        'Kad_O2O_Request': 'xxxxxx',
        'K-Version': '1.0',
        'Access-Control-Allow-Headers': 'Kad_O2O_Request',
        'Access-Control-Allow-Credentials': true
    });
    res.end(imgbase64);
});
module.exports = router;
