"use strict";
/**
 * Created by DuanG on 2016/11/24.
 */
var async = require('async');
/*
 page:页码
 pageSize:分页大小
 MongoModel:dataBase db connect
 fileds:过滤字段 {id:'',OrderIndex:''}
 queryParams:查询条件 for example {id:'xxxx'}
 sortParams:排序 for example {orderIndex:'desc'}
*/
function pageQuery(page, pageSize, MongoModel, populate, fileds, queryParams, sortParams) {
    var start = (page - 1) * pageSize;
    var $page = {
        pageNumber: page,
        pageCount: 0,
        results: {},
        Total: 0
    };
    return new Promise(function (resolve) {
        async.parallel({
            count: function (done) {
                MongoModel.count(queryParams).exec(function (err, count) {
                    done(err, count);
                });
            },
            records: function (done) {
                MongoModel.find(queryParams, fileds).skip(start).limit(pageSize).populate(populate).sort(sortParams).exec(function (err, doc) {
                    done(err, doc);
                });
            }
        }, function (err, results) {
            var count = results.count;
            $page.pageCount = (count - 1) / pageSize + 1;
            $page.results = results.records;
            $page.Total = count;
            if (!err) {
                resolve($page);
            }
            else {
                resolve(err);
            }
        });
    });
}
exports.pageQuery = pageQuery;
