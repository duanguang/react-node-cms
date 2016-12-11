"use strict";
/**
 * Created by xiaoduan on 2016/11/22.
 */
var BlogCateEntity_1 = require("../models/BlogCateEntity");
var ResponseModel_1 = require("../ResponseModel");
var Promise = require("bluebird");
var pageQueryHelper_1 = require("../common/pageQueryHelper");
var pageListEntity_1 = require("../models/pageListEntity");
var Bearcat = require('bearcat');
var BlogCateService = function () {
    var dataBaseConnect = Bearcat.getBean('dataBaseConnect');
    var db = dataBaseConnect.createConnection();
    var BlogCateSchema = Bearcat.getBean('BlogCateSchema');
    this.BlogCateMongo = BlogCateSchema.createConnection(db);
};
BlogCateService.prototype.InsertBlogCate = function (info) {
    var BlogCateMongo = this.BlogCateMongo;
    var count = 0;
    return BlogCateMongo.count({}).then(function (result) {
        count = result + 1;
        info.CateId = count;
        info.OrderIndex = count;
        var infoMoel = new BlogCateMongo(info);
        var query = BlogCateMongo.findOne({ "CateName": info.CateName });
        return query.exec()
            .then(function (result) {
            if (result != null) {
                return Promise.resolve(JSON.stringify(ResponseModel_1.ResponseModel.getErrorResponseModel('分类信息已存在')));
            }
            else {
                return infoMoel.save().then(function (result, state, err) {
                    console.log('save status:', err != undefined ? 'failed' : 'success'); //if the error is equal to undefined,then register successfully
                    return Promise.resolve(JSON.stringify(ResponseModel_1.ResponseModel.getSuccessResponseModel('添加成功')));
                });
            }
        }, function (err) {
            return Promise.reject(JSON.stringify(ResponseModel_1.ResponseModel.getErrorResponseModel('添加失败，请重新添加，如无法添加，请与我们工作人员联系')));
            // on reject
        });
    }, function (err) {
        return Promise.reject(JSON.stringify(ResponseModel_1.ResponseModel.getErrorResponseModel('添加失败，请重新添加，如无法添加，请与我们工作人员联系')));
    });
};
BlogCateService.prototype.GetPageCateList = function (page, pageSize, fileds, queryParams, sortParams) {
    var BlogCateMongo = this.BlogCateMongo;
    pageSize = pageSize ? pageSize : 10;
    if (!fileds) {
        var filedInfo = new BlogCateEntity_1.BlogCateFiledEntity();
        fileds = BlogCateEntity_1.BlogCateFiledEntity.getFileds(filedInfo);
    }
    return pageQueryHelper_1.pageQuery(page, pageSize, BlogCateMongo, '', fileds, queryParams ? queryParams : {}, sortParams ? sortParams : {}).then(function (result) {
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
BlogCateService.prototype.UpdateBlogCate = function (cateName, id) {
    var BlogCateMongo = this.BlogCateMongo;
    var query = BlogCateMongo.findOne({ '_id': id });
    return query.exec().then(function (result) {
        if (result != null) {
            return BlogCateMongo.findOne({ 'CateName': cateName }).then(function (result) {
                if (result != null) {
                    return Promise.resolve(JSON.stringify(ResponseModel_1.ResponseModel.getErrorResponseModel('分类信息已存在')));
                }
                else {
                    return BlogCateMongo.update({ '_id': id }, { CateName: cateName }).then(function (result) {
                        return Promise.resolve(JSON.stringify(ResponseModel_1.ResponseModel.getSuccessResponseModel('修改成功')));
                    }, function (error) {
                        return Promise.reject(JSON.stringify(ResponseModel_1.ResponseModel.getErrorResponseModel("\u4FEE\u6539\u4FE1\u606F\u5931\u8D25\uFF0C\u8BF7\u91CD\u65B0\u4FEE\u6539\uFF0C\u6216\u8BF7\u4E0E\u6211\u4EEC\u5DE5\u4F5C\u4EBA\u5458\u8054\u7CFB" + error)));
                    });
                }
            }, function (error) {
                return Promise.reject(JSON.stringify(ResponseModel_1.ResponseModel.getErrorResponseModel('修改信息失败，请重新修改，或请与我们工作人员联系')));
            });
        }
    }, function (error) {
        return Promise.reject(JSON.stringify(ResponseModel_1.ResponseModel.getErrorResponseModel('修改信息失败，请重新修改，或请与我们工作人员联系')));
    });
};
BlogCateService.prototype.DeleteBlogCate = function (id) {
    var BlogCateMongo = this.BlogCateMongo;
    return BlogCateMongo.remove({ '_id': id }).then(function (result) {
        var resultOk = result.result;
        if (resultOk.ok == 1 && resultOk.n === 1) {
            return Promise.resolve(JSON.stringify(ResponseModel_1.ResponseModel.getSuccessResponseModel('删除成功')));
        }
        else {
            return Promise.resolve(JSON.stringify(ResponseModel_1.ResponseModel.getErrorResponseModel('删除失败')));
        }
    });
};
module.exports = BlogCateService;
