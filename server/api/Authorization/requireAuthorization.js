"use strict";
/**
 * Created by DuanG on 2016/11/23.
 */
var express = require('express');
var cookieKey_1 = require("../../common/cookieKey");
var keyMemberCK_1 = require("../../common/keyMemberCK");
var cookie_1 = require("../../common/cookie");
var ResponseTool_1 = require("../../common/ResponseTool");
var ResponseModel_1 = require("../../ResponseModel");
exports.requireAuthorization = express.Router();
exports.requireAuthorization.use(function (req, res, next) {
    try {
        var result = keyMemberCK_1.keyMemberCK().decrypt(cookie_1.getCookie(cookieKey_1.MemberCK, req), 'utf-8');
        if (result) {
            next();
        }
    }
    catch (e) {
        cookie_1.clearCookie(cookieKey_1.MemberCK, res);
        ResponseTool_1.response(res, JSON.stringify(ResponseModel_1.ResponseModel.getErrorResponseModel('请先登录', ResponseModel_1.ApiStateEnum.AuthFail)), 401);
    }
});
