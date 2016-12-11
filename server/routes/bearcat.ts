/**
 * Created by XD on 2016/7/22.
 */
import express = require('express');
import * as path from 'path';
import {compilePath} from '../../dominSite.config';

const baseDir = path.resolve('.');
let router = express.Router();
var Bearcat = require('bearcat');
import {UserInfo} from '../models/UserInfo';
router.get('/bearcat', (req:express.Request, res:express.Response)=> {
    var car = Bearcat.getBean('car'); // get bean
    var car1=Bearcat.getBean('car');

    car.run();
    var info=new UserInfo();
   // info.UserId=1;
    info.QQ='123456';
    info.CreateDate=new Date().toDateString();
    var UserInfoServer=Bearcat.getBean('UserInfoService');
    UserInfoServer.InsertUser(info);
    console.log(new Date().toDateString());
    res.send(car===car1);
   // res.sendFile(path.join(baseDir, compilePath + '.html'));
});

export = router;