"use strict";
/**
 * Created by xiaoduan on 2016/10/16.
 */
var ResponseModel_1 = require('../ResponseModel');
var Promise = require('bluebird');
var Bearcat = require('bearcat');
var SystemMenuService = function () {
    var dateBaseConnect = Bearcat.getBean('dataBaseConnect');
    var db = dateBaseConnect.createConnection();
    var SystemMenuSchema = Bearcat.getBean('SystemMenuSchema');
    this.SystemMenuMongo = SystemMenuSchema.createConnection(db);
};
SystemMenuService.prototype.InsertSysMenu = function (info) {
    var infoModel = new this.SystemMenuMongo(info);
    var query = this.SystemMenuMongo.findOne({ 'Title': info.Title });
    return query.exec().then(function (result) {
        if (result) {
            return Promise.resolve(JSON.stringify(ResponseModel_1.ResponseModel.getErrorResponseModel('菜单已经存在,请重新添加')));
        }
        else {
            return infoModel.save().then(function (result, state, err) {
                return Promise.resolve(JSON.stringify(ResponseModel_1.ResponseModel.getErrorResponseModel('添加成功')));
            });
        }
    }, function (err) {
        return Promise.reject(JSON.stringify(ResponseModel_1.ResponseModel.getErrorResponseModel('添加系统菜单失败，请重试')));
    });
};
