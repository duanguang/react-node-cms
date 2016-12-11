"use strict";
/**
 * Created by XD on 2016/7/22.
 */
var express = require('express');
var path = require('path');
var baseDir = path.resolve('.');
var router = express.Router();
var Bearcat = require('bearcat');
var UserInfo_1 = require('../models/UserInfo');
router.get('/bearcat', function (req, res) {
    var car = Bearcat.getBean('car'); // get bean
    var car1 = Bearcat.getBean('car');
    car.run();
    var info = new UserInfo_1.UserInfo();
    // info.UserId=1;
    info.QQ = '123456';
    info.CreateDate = new Date().toDateString();
    var UserInfoServer = Bearcat.getBean('UserInfoService');
    UserInfoServer.InsertUser(info);
    console.log(new Date().toDateString());
    res.send(car === car1);
    // res.sendFile(path.join(baseDir, compilePath + '.html'));
});
module.exports = router;
