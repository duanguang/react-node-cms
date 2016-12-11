"use strict";
/**
 * Created by XD on 2016/9/16.
 */
var express = require('express');
var router = express.Router();
var keyMemberCK_1 = require('../../common/keyMemberCK');
var ResponseModel_1 = require("../../ResponseModel");
var cookie_1 = require("../../common/cookie");
var cookieKey_1 = require('../../common/cookieKey');
var ResponseTool_1 = require("../../common/ResponseTool");
var stringTool_1 = require("../../common/stringTool");
router.post('/chkUserLogin', function (req, res) {
    setTimeout(function () {
        var memberCk = req.body.memberCk;
        memberCk = decodeURIComponent(memberCk);
        try {
            var result = keyMemberCK_1.keyMemberCK().decrypt(memberCk, 'utf-8');
            if (result && stringTool_1.equal(memberCk, cookie_1.getCookie(cookieKey_1.MemberCK, req))) {
                console.log(result);
                // console.log(keyMemberCK().exportKey()+"private")
                ResponseTool_1.response(res, JSON.stringify(ResponseModel_1.ResponseModel.getSuccessResponseModel('登录成功')));
                return;
            }
        }
        catch (e) {
            cookie_1.clearCookie(cookieKey_1.MemberCK, res);
        }
        ResponseTool_1.response(res, JSON.stringify(ResponseModel_1.ResponseModel.getErrorResponseModel('请先登录', ResponseModel_1.ApiStateEnum.AuthFail)));
        return;
    }, 200);
});
module.exports = router;
