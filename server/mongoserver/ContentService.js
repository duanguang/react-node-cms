"use strict";
/**
 * Created by xiaoduan on 2016/12/7.
 */
var ResponseModel_1 = require("../ResponseModel");
var Promise = require("bluebird");
var ContentEntity_1 = require("../models/ContentEntity");
var pageQueryHelper_1 = require("../common/pageQueryHelper");
var pageListEntity_1 = require("../models/pageListEntity");
var Bearcat = require('bearcat');
var ContentService = function () {
    var dataBaseConnect = Bearcat.getBean('dataBaseConnect');
    var db = dataBaseConnect.createConnection();
    var ContentSchema = Bearcat.getBean('ContentSchema');
    var BlogCateSchema = Bearcat.getBean('BlogCateSchema');
    this.ContentMongo = ContentSchema.createConnection(db);
    this.BlogCateMongo = BlogCateSchema.createConnection(db);
};
ContentService.prototype.InsertContent = function (info) {
    var ContentMongo = this.ContentMongo;
    var infoMoel = new ContentMongo(info);
    return infoMoel.save().then(function (result, state, err) {
        console.log('save status:', err != undefined ? 'failed' : 'success'); //if the error is equal to undefined,then register successfully
        return Promise.resolve(JSON.stringify(ResponseModel_1.ResponseModel.getSuccessResponseModel('添加成功')));
    });
};
ContentService.prototype.GetContentPageList = function (page, pageSize, fileds, queryParams, sortParams) {
    var ContentMongo = this.ContentMongo;
    pageSize = pageSize ? pageSize : 10;
    if (!fileds) {
        var filedInfo = new ContentEntity_1.ContentFiledEntity();
        fileds = ContentEntity_1.ContentFiledEntity.getFileds(filedInfo);
    }
    var populate = { path: 'CateId', select: 'CateName' };
    return pageQueryHelper_1.pageQuery(page, pageSize, ContentMongo, populate, fileds, queryParams ? queryParams : {}, sortParams ? sortParams : {}).then(function (result) {
        var info = new pageListEntity_1.PageListEntity();
        info.Data = result.results;
        info.PageIndex = parseInt(page.toString());
        info.PageSize = pageSize;
        info.TotalPage = result.pageCount;
        info.Total = result.Total;
        return Promise.resolve(JSON.stringify(ResponseModel_1.ResponseModel.getSuccessResponseModel(info)));
    }, function (err) {
        return Promise.reject(JSON.stringify(ResponseModel_1.ResponseModel.getErrorResponseModel('查询信息失败，请重新查询，或请与我们工作人员联系')));
    });
};
module.exports = ContentService;
