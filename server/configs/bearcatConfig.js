"use strict";
/**
 * Created by XD on 2016/7/22.
 */
var Bearcat = require('bearcat');
var contextPath = require.resolve('../../context.json');
//export const bearcatRosolve=Bearcat.createApp([contextPath]);
Bearcat.createApp([contextPath]);
exports.bearcatConfig = function (app) {
    Bearcat.start(function () {
        //var car = Bearcat.getBean('car'); // get bean 示例
        // console.log(bearcat.getModel('car'));
        //car.run(); // call the method
        var dataBaseConnects = Bearcat.getBean('dataBaseConnect');
        dataBaseConnects.connect();
        var UserSchema = Bearcat.getBean('UserSchema');
        UserSchema.connect();
    });
};
exports.bearcatInit = function (app) {
    Bearcat.start(function () {
        var dataBaseConnects = Bearcat.getBean('dataBaseConnect');
    });
};
